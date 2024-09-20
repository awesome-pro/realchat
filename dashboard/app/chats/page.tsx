"use client";

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

function Chats() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [chats, setChats] = useState<any[]>([]);

    const fetchChats = useCallback(async () => {
        setLoading(true)
        try {
            const res = await axios.get("http://localhost:8000/chats/")
            const data = res.data
            console.log(data)
            setChats(data)
        } catch (error: any) {
            console.log(error.message)
            setError(error.message)
        }
        setLoading(false)
    }, [])


    useEffect(() => {
        fetchChats()
    },[fetchChats])



  return (
    <section className='w-screen min-h-screen flex flex-col items-center justify-center'>
        <h1 className='text-center w-screen bg-primary/20'>All Chats</h1>
        <Table className='max-w-[70%]'>
            <TableCaption>All the Chats in the database</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-right">Chat ID</TableHead>
                    <TableHead className="w-[100px]">Sender ID</TableHead>
                    <TableHead>Reciever ID</TableHead>
                    <TableHead>Message</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                    {chats.map((chat) => (
                        <TableRow key={chat.id} className='lg:max-w-[60%]'>
                            <TableCell className="text-right">
                                {loading ? "Loading..." : error ? "Error" : chat.id}
                            </TableCell>
                            <TableCell>
                                {loading ? "Loading..." : error ? "Error" : chat.sender_id}
                            </TableCell>
                            <TableCell>
                                {loading ? "Loading..." : error ? "Error" : chat.receiver_id}
                            </TableCell>
                            <TableCell>
                                {loading ? "Loading..." : error ? "Error" : chat.message}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </section>
  )
}

export default Chats