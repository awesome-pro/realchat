"use client";

import { cn } from '@/lib/utils';
import { use, useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import axios from 'axios';

interface ChatProps {
  senderId: number;
  receiver: { id: number; username: string };
}

const Chat: React.FC<ChatProps> = ({ senderId, receiver }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [info, setInfo] = useState<string>('');
  const [previousChat, setPreviousChat] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchPreviousChats = useCallback(async (sender_id: string, reciever_id: string) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/chats?sender=${sender_id}&receiver=${reciever_id}`);
      const data = res.data;
      console.log(data);
      setPreviousChat(data);
    } catch (error: any) {
      console.error('Error fetching previous chats: ', error);
      setError('An error occurred while fetching previous chats: ' + error.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  // Request permission for browser notifications
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    fetchPreviousChats(senderId.toString(), receiver.id.toString());
  }, [fetchPreviousChats, receiver.id, senderId]);

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
    <div className='w-full h-full p-3 relative flex flex-col items-baseline justify-normal bg-blue-700/20'>
      <h2 className='text-xs'>Chat with
        <span className='text-lg font-semibold text-blue-700'> {receiver.username}</span>
      </h2>
      <br />
      <div className='w-full messages-list '>
        {previousChat.map((msg, index) => (
          <div key={index} className={cn(
            'p-2 m-2 max-w-[90%] rounded-lg flex w-full',
            msg.sender_id === senderId ? 'bg-blue-400/30  items-start text-start pr-20' : 'bg-gray-100/90 text-black items-end text-right pl-[30%]'
          )}>
            <div>
              {
                msg.message == "You have Joined" ? (
                  <p className='text-xs text-gray-400'>{msg.message}</p>
                ) : (
                  <p className='text-sm'>{msg.message}</p>
                )
              }
            </div>
          </div>
        ))}

        {messages.map((msg, index) => (
          <div key={index} className={cn(
            'p-2 m-2 max-w-[90%] rounded-lg flex w-full',
            msg.username === 'You' ? 'bg-blue-400/30  items-start text-start pr-20' : 'bg-gray-100/90 text-black items-end text-right pl-[30%]'
          )}>
            <div>
              {
                msg.data == "You have Joined" ? (
                  <p className='text-xs text-gray-400'>{msg.data}</p>
                ) : (
                  <p className='text-sm'>{msg.data}</p>
                )
              }
              
            </div>
          </div>
        ))}
      </div>
      <div className='w-full lg:w-[60%] flex items-center justify-center gap-0 absolute bottom-5 text-black px-5'>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          className='w-full p-2 rounded-r-none'
          placeholder='Type a message...'
        />
        <Button onClick={sendMessage} className='rounded-l-none min-w-28'>Send</Button>
      </div>
    </div>
  );
};

export default Chat;
