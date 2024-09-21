"use client"

import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

function GroupIDPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const groupId = params.id
  const userId = searchParams.get('userId')
  const username = searchParams.get('username')

  interface Message {
    message: string;
    sender_id: string | null;
    sender_name: string;
  }

  const [messages, setMessages] = React.useState<Message[]>([])
  const [message, setMessage] = React.useState('')
  const [info, setInfo] = React.useState<string>('')

  const [socket, setSocket] = React.useState<WebSocket | null>(null)

  useEffect(() => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }

    const ws = new WebSocket(`ws://localhost:8000/group/${groupId}/${userId}`)
    setSocket(ws)

    ws.onopen = () => {
        setInfo('WebSocket connection established')
    }

    ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data)
        setMessages((prevMessages) => [...prevMessages, { ...messageData, sender_name: messageData.sender_name || 'Unknown' }])
    }

    ws.onclose = () => {
        setInfo('WebSocket connection closed')
    }

    return () => {
        ws.close()
    }
  }, [groupId, userId])

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      const messageData = {
        message,
        sender_id: userId,
        sender_name: username
      }
      socket.send(JSON.stringify(messageData))
      setMessages((prevMessages) => [...prevMessages, { ...messageData, sender_name: messageData.sender_name || 'Unknown' }])
      setMessage('')
    }
  }

  return (
    <section className='relative w-full h-full flex flex-col items-center justify-start'>
      <div className='flex flex-col items-center'>
        {messages.map((msg, index) => (
          <div key={index}>{msg.sender_name}: {msg.message}</div>
        ))}
      </div>
      <div className='flex absolute bottom-2 gap-0 w-[90%]'>
        <Input
          placeholder='Type a message'
          className='w-full'
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