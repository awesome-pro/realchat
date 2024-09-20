"use client"

import React, { useState, useEffect, useRef } from 'react';


interface Message {
  isMe: boolean;
  data: string;
  username: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>('');
  const [senderId, setSenderId] = useState<number>(1);
  const [recieverId, setRecieverId] = useState<number>(2);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Request permission for notifications on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const newMessage: Message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Scroll to the bottom of the chat when a new message arrives
        scrollToBottom();

        // Show browser notification if it's not the user's own message
        if (!newMessage.isMe) {
          showNotification(newMessage.username, newMessage.data);
        }
      };

      socket.onclose = () => {
        console.log('WebSocket closed.');
      };

      socket.onerror = (error) => {
        console.error('WebSocket error: ', error);
      };
    }
  }, [socket]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const joinChat = () => {
    const newSocket = new WebSocket('ws://localhost:3000/message');
    setSocket(newSocket);
  };

  const sendMessage = () => {
    if (socket && currentMessage) {
      const messageData = { message: currentMessage, username };
      socket.send(JSON.stringify(messageData));
      setCurrentMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  };

  const showNotification = (sender: string, message: string) => {
    if (Notification.permission === 'granted') {
      new Notification(`New message from ${sender}`, {
        body: message,
        icon: '/chat-icon.png', // Optional: You can include an icon here
      });
    }
  };

  return (
    <div className="chat-container !text-black">
      {!socket ? (
        <div className="join-container">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-room">
          <div className="messages" style={{ height: '300px', overflowY: 'scroll' }}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.isMe ? 'my-message' : 'other-message'}>
                <strong>{msg.username}: </strong>
                {msg.data}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
