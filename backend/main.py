from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.websockets import WebSocketState
from dataclasses import dataclass
from typing import Dict, List, Annotated
import json
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from pydantic import BaseModel
import asyncio


@dataclass
class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: Dict[int, List[WebSocket]] = {}
        self.group_connections: Dict[int, List[int]] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        try:
            await websocket.accept()
            if user_id not in self.active_connections:
                self.active_connections[user_id] = []
            self.active_connections[user_id].append(websocket)
            print(f"Active connections: {self.active_connections}")
            await self.send_message(websocket, json.dumps({"data": "You have joined!!", "username": "You"}))
            print(f"User {user_id} is connected")
        except WebSocketDisconnect:
            print(f"WebSocket connection for User {user_id} was closed prematurely during connection.")
            await self.disconnect(websocket=websocket, user_id=user_id)
        except Exception as e:
            print(f"Error during WebSocket connection for User {user_id}: {e}")

    async def send_message(self, ws: WebSocket, message: str):
        try:
            if ws.client_state == WebSocketState.CONNECTED:
                await ws.send_text(message)
            else:
                print(f"WebSocket {ws} is not connected.")
        except WebSocketDisconnect:
            print("WebSocket disconnected during send_message.")
        except Exception as e:
            print(f"Error while sending message: {e}")

    async def send_private_message(self, sender_id: int, receiver_id: int, message: str, username: str):
        if receiver_id in self.active_connections.keys():
            try:
                print(f"User {receiver_id} is connected")
                # if both the sender and reciever are same, then send the message to the sender only
                if sender_id == receiver_id:
                    for ws in self.active_connections[receiver_id]:
                        await self.send_message(ws, json.dumps({"isSeen": True, "data": message, "username": "You"}))
                    return
                for receiver_ws in self.active_connections[receiver_id]:
                    await self.send_message(receiver_ws, json.dumps({"isSeen": True, "data": message, "username": username}))
                for sender_ws in self.active_connections[sender_id]:
                    await self.send_message(sender_ws, json.dumps({"isSeen": True, "data": message, "username": "You"}))
            except WebSocketDisconnect:
                print(f"WebSocket disconnected while sending a private message to User {receiver_id}.")
                await self.disconnect(websocket=receiver_ws, user_id=receiver_id)
            except Exception as e:
                print(f"Error while sending private message: {e}")
        else:
            print(f"User {receiver_id} is not connected")
            if sender_id in self.active_connections:
                for sender_ws in self.active_connections[sender_id]:
                    await self.send_message(sender_ws, json.dumps({"isSeen": False, "data": message, "username": "You"}))

    async def broadcast_group_message(self, group_id: int, message: str, username: str):
        if group_id in self.group_connections:
            for user_id in self.group_connections[group_id]:
                if user_id in self.active_connections:
                    for ws in self.active_connections[user_id]:
                        await self.send_message(ws, json.dumps({"group_id": group_id, "data": message, "username": username}))

    def add_user_to_group(self, group_id: int, user_id: int):
        if group_id not in self.group_connections:
            self.group_connections[group_id] = []
        if user_id not in self.group_connections[group_id]:
            self.group_connections[group_id].append(user_id)

    async def disconnect(self, websocket: WebSocket, user_id: int):
        if user_id in self.active_connections:
            try:
                self.active_connections[user_id].remove(websocket)
                if not self.active_connections[user_id]:
                    del self.active_connections[user_id]
                print(f"User {user_id} is disconnected.")
            except Exception as e:
                print(f"Error while closing WebSocket for User {user_id}: {e}")


app = FastAPI()

origin = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def read_root():
    return {"message": "App is running perfectly fine  :)"}

connection_manager = ConnectionManager()

@app.websocket("/ws/{sender_id}/{receiver_id}")
async def websocket_endpoint(websocket: WebSocket, sender_id: int, receiver_id: int):
    await connection_manager.connect(websocket, sender_id)

    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            message = message_data.get("message")
            await connection_manager.send_private_message(sender_id, receiver_id, message, username=str(sender_id))
    except WebSocketDisconnect:
        print(f"User {sender_id} disconnected.")
        await connection_manager.disconnect(websocket=websocket, user_id=sender_id)
    except Exception as e:
        print(f"Error in WebSocket endpoint: {e}")

@app.websocket("/active_users")
async def websocket_active_users_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while websocket.client_state == WebSocketState.CONNECTED:
            active_users = list(connection_manager.active_connections.keys())
            await connection_manager.send_message(websocket, json.dumps(active_users))
            await asyncio.sleep(10)
    except WebSocketDisconnect:
        print("User disconnected from active users WebSocket")

@app.websocket("/group/{group_id}/{user_id}")
async def websocket_group_endpoint(websocket: WebSocket, group_id: int, user_id: int):
    await connection_manager.connect(websocket, user_id)
    connection_manager.add_user_to_group(group_id, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            message = message_data.get("message")
            sender_id = message_data.get("sender_id")
            sender_name = message_data.get("sender_name")
            await connection_manager.broadcast_group_message(group_id, message, username=sender_name)
    except WebSocketDisconnect:
        await connection_manager.disconnect(websocket, user_id)
    except Exception as e:
        print(f"Error in WebSocket endpoint: {e}")

models.Base.metadata.create_all(bind=engine)

class UserBase(BaseModel):
    username: str

class ChatBase(BaseModel):
    sender_id: int
    receiver_id: int
    message: str

class GroupBase(BaseModel):
    name: str

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.get("/users")
async def get_users(request: Request, db: db_dependency):
    if 'id' in request.query_params:
        user_id = request.query_params['id']
        return db.query(models.User).filter(models.User.id == user_id).all()
    return db.query(models.User).all()

@app.post("/users/")
async def create_user(user: UserBase, db: db_dependency):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        previous_chats = db.query(models.Chat).filter(
            (models.Chat.sender_id == existing_user.id) | 
            (models.Chat.receiver_id == existing_user.id)
        ).all()
        return {"message": "User already exists", "previous_chats": previous_chats}
    
    db_user = models.User(username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/chats/")
async def create_chat(chat: ChatBase, db: db_dependency):
    db_chat = models.Chat(**chat.dict())
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat

@app.get("/chats/")
async def get_chats(request: Request, db: db_dependency):
    if 'sender' in request.query_params and 'receiver' in request.query_params:
        sender = request.query_params['sender']
        receiver = request.query_params['receiver']
        return db.query(models.Chat).filter(models.Chat.sender_id == sender, models.Chat.receiver_id == receiver).all()
    return db.query(models.Chat).all()

@app.get("/chats/{sender_id}/{receiver_id}")
async def get_chats(sender_id: int, receiver_id: int, db: db_dependency):
    return db.query(models.Chat).filter(models.Chat.sender_id == sender_id, models.Chat.receiver_id == receiver_id).all()

@app.get("/users/{user_id}")
async def get_user(user_id: int, db: db_dependency):
    return db.get(models.User, user_id)

@app.get("/groups")
async def get_groups(db: db_dependency):
    return db.query(models.Group).all()

@app.post("/groups")
async def create_group(group: GroupBase, db: db_dependency):
    existing_group = db.query(models.Group).filter(models.Group.name == group.name).first()
    if existing_group:
        return existing_group
    
    db_group = models.Group(name=group.name)
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

@app.get("/groups")
async def get_groups(request: Request, db: db_dependency):
    if 'id' in request.query_params:
        group_id = request.query_params['id']
        return db.query(models.Group).filter(models.Group.id == group_id).all()
    return db.query(models.Group).all()

@app.post("/groups/{group_id}/add_user/{user_id}")
async def add_user_to_group(group_id: int, user_id: int, db: db_dependency):
    group = db.get(models.Group, group_id)
    user = db.get(models.User, user_id)
    group.members.append(user)
    db.commit()
    db.refresh(group)
    return group

@app.get("/groups/{group_id}/users")
async def get_group_users(group_id: int, db: db_dependency):
    group = db.get(models.Group, group_id)
    return group.members