"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function ChatIDpage() {

  const params = useParams();
  const searchParams = useSearchParams();
  const userID = params.id as string;
  const receiverID = searchParams.get('receiver') as string;
  const recieverName = searchParams.get('receivername') as string;

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>('');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [info, setInfo] = useState<string>('');
  const [previousChat, setPreviousChat] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  // const fetchPreviousChats = useCallback(async (sender_id: string, reciever_id: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await axios.get(`http://localhost:8000/chats?sender=${us}&receiver=${reciever_id}`);
  //     const data = res.data;
  //     console.log(data);
  //     setPreviousChat(data);
  //   } catch (error: any) {
  //     console.error('Error fetching previous chats: ', error);
  //     setError('An error occurred while fetching previous chats: ' + error.toString());
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // Request permission for browser notifications
  // useEffect(() => {
  //   if (Notification.permission !== 'granted') {
  //     Notification.requestPermission();
  //   }

  //   fetchPreviousChats(userID as string, receiverID as string);
  // }, [fetchPreviousChats, receiverID, userID]);

  useEffect(() => {
    // Clear previous messages when senderId or receiver.id changes
    setMessages([]);

    const socket = new WebSocket(`ws://localhost:8000/ws/${userID}/${receiverID}`);
    setWs(socket);

    socket.onopen = () => {
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
      socket.close();
    };
  }, [userID, receiverID]); // Refresh WebSocket and messages when senderId or receiver.id changes

  const sendMessage = async () => {
    if (ws && input.trim()) {
      const message = {
        sender_id: userID,
        receiver_id: receiverID,
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
    <section className='w-full h-full flex flex-col justify-between'>
       <header className='pl-10 py-8 bg-blue-600 text-white'>
          <h1 className='text-2xl font-bold'>Chat with <strong>{recieverName}</strong></h1>
       </header>
      <div>
      {
      receiverID ? (
          messages.map((msg, index) => (
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
            </div >
          ))
      ) : (
      <div className='text-2xl text-center font-semibold'>
          Select a user to chat with
      </div>
      )
    }
      </div>
      <div className='flex gap-0  bg-blue-600/20 px-10 py-5 w-full'>
        <Input
          placeholder='Type a message'
          className=''
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button size={'lg'} className='' onClick={sendMessage}
         onKeyPress={(e) => {
          if (e.key === 'Enter') {
            sendMessage();
          }
         }}>
          Send
        </Button>
      </div>
    </section>
  )
}

export default ChatIDpage