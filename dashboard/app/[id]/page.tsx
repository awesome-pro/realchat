"use client";

import Chat from '@/components/chat-app';
import ChatApp from '@/components/chat-app';
import { Skeleton } from '@/components/ui/skeleton';
import UserList from '@/components/user-list';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Home(
  {params}: {params: {id: string}}
) {

  const router = useRouter();

  if(!params.id || isNaN(parseInt(params.id))) {
    toast.info("Please login to continue")
    router.push('/auth')
  }


  const [users, setUsers] = useState<{ id: number; username: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null);
  const [currentUser, setCurrentUser] = useState<number>(parseInt(params.id)); // Set the current logged-in user ID
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getUsers = useCallback(async() => {
    setLoading(true);
    try {
      const response = await axios.get('https://realchat-nakw.onrender.com/users/');
      setUsers(response.data);
    } catch (error: any) {
      console.error('Error fetching users: ', error);
      setError('An error occurred while fetching users.: ' + error.toString());
    }finally {
      setLoading(false);
    }

  }, [])
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const selectUser = (user: { id: number; username: string }) => {
    setSelectedUser(user);
  };

  if (loading) return (
       <div className='flex flex-col items-center justify-start gap-6'>
                <Skeleton className='w-full h-24' />
                <Skeleton className='w-full h-24' />
                <Skeleton className='w-full h-24' />
                <Skeleton className='w-full h-24' />
      </div>
  )

  return (
    <div>

      {error && <p className='text-red-600 font-semibold text-2xl  bg-red-500/20 p-3 w-fit'>{error}</p>}
      <div className='text-center w-full mt-10 text-blue-600'>
        <h1 className='text-3xl font-bold mb-6'>Chat App</h1>
      </div>
      <div className='flex gap-2 '>
        <div className='w-[30%] flex flex-col justify-center ml-5 mt-2 bg-teal-600/20 rounded-lg p-3'>
          <UserList users={users} selectUser={selectUser} />
        </div>
        <div className='lg:w-[70%]'>
          {selectedUser ? (
            <Chat senderId={currentUser} receiver={selectedUser} />
          ) : (
            <section className='w-full h-full rounded-2xl flex flex-col items-center justify-center bg-blue-500/10'>
              <h2 className='text-2xl font-bold'>Select a user to chat with</h2>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}