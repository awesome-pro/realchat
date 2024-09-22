"use client"

import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Info, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'


function GroupIDPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const groupId = params.id
  const userId = searchParams.get('userid')
  const username = searchParams.get('username')



  const [messages, setMessages] = React.useState<any[]>([])
  const [message, setMessage] = React.useState('')
  const [info, setInfo] = React.useState<string>('')

  const [socket, setSocket] = React.useState<WebSocket | null>(null)

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    if (groupId && userId) {
      const ws = new WebSocket(`ws://localhost:8000/group/${groupId}/${userId}`);

      ws.onopen = () => {
        console.log('Connected to group chat');
        setInfo('Connected to group chat');
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setInfo('Message received');
        if (Notification.permission === 'granted') {
          if(data.username !== username || data.username !== "You")
            new Notification(data.username, { body: data.data });
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from group chat');
        setInfo('Disconnected from group chat');
      };

      ws.onerror = (error) => {
        console.error('WebSocket error: ', error);
        setInfo('WebSocket error');
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [groupId, userId, username]);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      const messageData = {
        message,
        sender_id: userId,
        sender_name: username,
      };
      socket.send(JSON.stringify(messageData));
      // add the new messsage to the list of messages
      setMessage('');
    }
  };

  return (
    <section className='relative w-full h-full flex flex-col items-center justify-start bg-blue-600/10'>
      <div className='flex flex-col items-center w-full '>
        <header className='w-full bg-white text-blue-600 flex items-center justify-between p-4' >
          <h1 className='text-xl text-primary'>Group Chat: <strong>{groupId}</strong></h1>
          <span className='text-xs text-black flex gap-2 items-center'><Info className='w-5'/>  {info}</span>
        </header>
        {messages.map((msg, index) => (
            <div key={index} className={cn(
              'w-full flex flex-col justify-between gap-2 px-3 mt-10',
              msg.username === username ? 'items-end' : 'items-start'
            )}>
              <Card className={cn(
                'max-w-[80%] min-w-[30%] py-2 px-3 flex items-center justify-between',
               msg.username === username ? 'bg-blue-600 text-white' : 'bg-white text-black'
              )}>
                <span className='w-[95%] flex gap-2'>
                  {msg.username}: {msg.data}
                </span>
                { msg.isSeen && msg.data !== "You have Joined"  &&
                  msg.isSeen === "true" ? (
                    <span className='text-xs text-white'>Seen</span>
                  ) : (
                    <span className='text-xs text-white'>
                      <span>Sent</span>
                    </span>
                  )
                }
              </Card>
              <Card className='w-[20%] bg-red-500 h-full'>

              </Card>
            </div >
          ))}
      </div>
      <div className='flex absolute bottom-2 gap-0 w-[90%]'>
        <Input
          placeholder='Type a message'
          className='w-full rounded-r-none'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className='' size={'lg'} onClick={sendMessage}>
          <Send className='rotate-45 rounded-l-none'/>
        </Button>
      </div>
    </section>
  )
}

export default GroupIDPage