"use client";

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

interface ChatProps {
  senderId: number;
  receiver: { id: number; username: string };
}

const Chat: React.FC<ChatProps> = ({ senderId, receiver }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [info, setInfo] = useState<string>('');

  // Request permission for browser notifications
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    // Clear previous messages when senderId or receiver.id changes
    setMessages([]);

    const socket = new WebSocket(`ws://localhost:8000/ws/${senderId}/${receiver.id}`);
    setWs(socket);

    socket.onopen = () => {
      toast.success('WebSocket connection established');
      console.log('WebSocket connection established');
      setInfo('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      const messageData = JSON.parse(event.data); // Parse the incoming message
      setMessages((prevMessages) => [...prevMessages, messageData]);

      // Show a browser notification if the message is from another user
      if (messageData.username !== 'You' && Notification.permission === 'granted') {
        new Notification('New message from ' + messageData.username, {
          body: messageData.data,
        });
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setInfo('WebSocket connection closed');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
      setInfo('WebSocket error: ' + error);
    };

    return () => {
      toast.info('Closing WebSocket connection');
      socket.close();
    };
  }, [senderId, receiver.id]); // Refresh WebSocket and messages when senderId or receiver.id changes

  const sendMessage = async () => {
    if (ws && input.trim()) {
      const message = {
        sender_id: senderId,
        receiver_id: receiver.id,
        message: input.trim(),
      };

      ws.send(JSON.stringify(message)); // Send message as JSON
      toast.success('Message sent');
      setInput('');
    } else {
      toast.error('Please type a message');
    }
  };

  return (
    <div className='w-full lg:min-h-[600px] p-3 rounded-xl relative flex flex-col items-baseline justify-normal bg-blue-700/20'>
      <h2 className='text-xs'>Chat with
        <span className='text-lg font-semibold text-blue-300'> {receiver.username}</span>
      </h2>
      <br />
      <div className='messages-list'>
        {messages.map((msg, index) => (
          <div key={index} className={cn(
            'p-2 m-2 max-w-[80%] rounded-lg',
            msg.username === 'You' ? 'bg-blue-400/30 text-right' : 'bg-gray-100/90 text-black text-left'
          )}>
            <strong>{msg.username}:</strong> {msg.data}
          </div>
        ))}
      </div>
      <div className='flex items-center justify-center gap-0 absolute bottom-2 text-black'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          className='w-full p-2 min-w-[400px] rounded-r-none'
          placeholder='Type a message...'
        />
        <Button onClick={sendMessage} className='rounded-l-none'>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
