"use client";

import { getClientSideClient } from "@/app/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

import React from "react";

type UserProfileProps = {
  user: User;
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const supabase = getClientSideClient();
  const router = useRouter();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("/");
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex overflow-hidden flex-wrap gap-10 justify-between items-center p-10 w-full bg-orange-100 rounded-2xl max-md:px-5 max-md:max-w-full">
      <div className="flex gap-4 items-center self-stretch my-auto">
        <img
          loading="lazy"
          src={user.user_metadata?.avatar_url}
          alt="User profile"
          className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[53px] w-[52px]"
        />
        <div className="flex flex-col self-stretch my-auto ">
          <div className="text-2xl font-semibold leading-snug text-neutral-900">
            {user.user_metadata.name}
          </div>
          <div className="self-start mt-1.5 text-sm font-medium leading-tight text-center text-neutral-400">
            {user.email}
          </div>
        </div>
      </div>
      <button
        className="self-stretch my-auto text-sm font-semibold leading-snug text-center text-gray-500"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default UserProfile;
