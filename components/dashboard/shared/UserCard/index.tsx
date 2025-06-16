"use client";
import React from "react";
import { SMARTPATHUSER } from "@/constants";
import { IUser } from "@/types/auth";
import { getCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
type Props = {};

function UserCard({}: Props) {
  const user: IUser = getCookie(SMARTPATHUSER)
    ? JSON.parse(getCookie(SMARTPATHUSER) as string)
    : null;
  return (
    user && (
      <div className="h-full flex items-center gap-2 w-[200px] p-2 border rounded-md border-gray-200">
        <Avatar className="h-8 w-8 ">
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>{user?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-0">
          <span className="font-semibold">{user?.name}</span>
          <span className="text-[10px] text-gray-500">{user?.email}</span>
        </div>
      </div>
    )
  );
}

export default UserCard;
