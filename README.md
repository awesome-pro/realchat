# Real-Time Messaging 

<img src="/dashboard/public/hero.png" alt="GIF" width="600" />

## Important Links

1. [Frontend](https://realchat-mauve.vercel.app/)
3. [Backend Deployment](https://realchat-nakw.onrender.com/)
2. [Postman Collections](https://ashwini-1346.postman.co/workspace/Ashwini-Workspace~362b564f-b14f-4331-a4f8-1073429e89b7/collection/31971900-92eb52a9-6cbe-439b-938e-8264f01e67d4)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Key Project Requirements](#key-project-requirements)
- [File Structure](#file-structure)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)

## Overview

This project is a real-time messaging application, built with scalability and functionality in mind. The app allows users to send real-time messages via their browser and ensures the delivery and storage of messages reliably. While the UI is functional, the focus of this project is on delivering a stable and performant system. The app is built using **FastAPI** for the backend and **Next.js** (TypeScript) for the front end, with **PostgreSQL** for database storage and **WebSockets** for real-time messaging.

## Images
  <img src="/dashboard/public/screenshots/sc1.png" width="300px" />
  <img src="/dashboard/public/screenshots/sc2.png" width="300px"/>
  <img src="/dashboard/public/screenshots/sc3.png" width="300px" />
  <img src="/dashboard/public/screenshots/sc4.png" width="300px" />
  <img src="/dashboard/public/screenshots/sc5.png" width="300px" />
  <img src="/dashboard/public/screenshots/sc6.png" width="300px" />
  <img src="/dashboard/public/screenshots/sc7.png" width="300px" />


## Features

### User Login
- Users can log in by choosing a username.
- Once logged in, the system lists all active users.
- [Link](http://localhost:3000/login)


### Real-Time Private Messaging
- Users can select another active user and start a real-time chat.
- Messages are delivered instantly between users using **WebSockets**.
- Incoming messages trigger **browser notifications** for better interaction.
- [Link](http://localhost:3000/features)

## Real-time Group Chat
- Users can join a group chat room and send messages to all participants.
- Messages are delivered instantly to all users in the chat room.
- Users can see who is currently active in the chat room.
- [Link](http://localhost:3000/features)

### Database Integration
- Every message sent is stored in **PostgreSQL** using **SQLAlchemy ORM**.
- Ensures data integrity, security, and scalability.

## Tech Stack

### Backend
- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **WebSockets**: Used for real-time messaging.
- **SQLAlchemy ORM**: Used for database interactions.
- **PostgreSQL**: Database to store all chat messages and user information.

### Frontend
- **Next.js**: A React-based framework optimized for speed and scalability.
- **TypeScript**: For type safety and cleaner code.
- **WebSockets**: For real-time, two-way communication between the client and server.
- **Axios**: Used for making HTTP requests.
- **Tailwind CSS**: Utility-first CSS framework for quick UI design.

### Other Libraries
- **Sonner**: For toast notifications.
- **Browser Notifications**: For alerting users of new messages.

## Key Project Requirements

### Stability & Usability
- Real-time messaging is reliable, and all messages are stored securely in the database.
- Functional chat UI with minimal delay in message delivery.

### Data Structures & Software Architecture
- The backend handles WebSocket connections and stores messages efficiently in the database.
- The frontend efficiently manages real-time updates and user interactions.
  
### Git Usage
- The project was developed following proper Git workflow and branch management for ease of collaboration and tracking progress.

## File Structure

```bash
.
├── backend
│   ├── alembic
│   ├── alembic.ini
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   └── .env
├── dashboard
│   ├── app
│   ├── components
│   ├── public
│   ├── lib
│   └── utils
├── .gitignore
├── README.md
```

## Setup Instructions

### Prerequisites

- **Python 3.10+** for the backend.
- **Node.js 18+** for the frontend.
- **PostgreSQL** for the database.

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/awesome-pro/realchat.git
   cd realchat
   ```

2. **Create a virtual environment**:
   ```bash
   cd backend
   python -m venv env
   source env/bin/activate  # Linux/Mac
   env\Scripts\activate  # Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure PostgreSQL**:
   - Ensure PostgreSQL is running on port `5432`.
   - Copy .env.example to .env and update the database URL.
   - Update the database URL in `alembic.ini` as well.

5. **Run the backend server**:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the frontend app**:
   ```bash
   npm run dev
   ```
4. **Open the browser**:
   ```bash
   http://localhost:3000
   ```

### Database Setup

1. **Create the PostgreSQL database**:
   ```bash
   createdb chat_db
   ```

2. **Run migrations** to create the necessary tables:
   ```bash
   alembic upgrade head
   ```

### Running the Application

- Navigate to `http://localhost:3000` to access the frontend.
- Backend should be running at `http://localhost:8000`.

## Testing

You can test the app by opening the chat in multiple browser windows or different devices.

- **WebSocket functionality**: Tested with manual message sending and receipt.
- **Database persistence**: Checked for proper storage and retrieval of chat history.
- **Real-time notifications**: Confirmed that messages are delivered instantly and browser notifications are triggered.

## Future Improvements

- **User Authentication**: Integrate OAuth or JWT-based authentication for better user security.
- **Chat History**: Implement pagination for chat history.
- **Improved UI**: Enhance the chat interface to provide a better user experience.
  
## Conclusion

This real-time chat app is designed with a focus on performance, scalability, and reliability. It's a demonstration of how modern web technologies can be combined to deliver a functional and robust messaging system, suitable for large-scale applications.

Feel free to reach out if you have any questions or need further clarification!

Thank you for reading!

