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
      <h3 className="text-2xl font-semibold">Select a user to chat with</h3>
      <ul className="flex flex-col gap-3">
        {users.map(user => (
          <li key={user.id} onClick={() => selectUser(user)} className={cn(
            "text-white bg-teal-700  p-3  gap-3 max-w-[80%] rounded-lg cursor-pointer hover:bg-teal-600",
          )}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
