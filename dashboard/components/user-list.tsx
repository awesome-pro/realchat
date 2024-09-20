// components/UserList.tsx

import { cn } from "@/lib/utils";
import { FC } from "react";

interface UserListProps {
  users: { id: number; username: string }[];
  selectUser: (user: { id: number; username: string }) => void;
}

const UserList: FC<UserListProps> = ({ users, selectUser }) => {
  return (
    <div className="relative">
      <h3 className="text-2xl font-semibold top-1 mb-5">Users List</h3>
      <ul className="flex flex-col gap-3">
        {users.map(user => (
          <li key={user.id} onClick={() => selectUser(user)} className={cn(
            "text-white bg-teal-700  p-3  gap-3 max-w-[80%] rounded-lg cursor-pointer hover:bg-teal-600 relative",
          )}>
            {user.username} 
            <span className="text-sm absolute right-5 text-center">{user.id}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
