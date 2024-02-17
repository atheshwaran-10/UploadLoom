import React from 'react'
import UserHeader from "./UserHeader";
import { getCurrentUser } from '@/hooks/getCurrentUser';
const Header = async () => {
  const user=await getCurrentUser();
  return (
    <div className="border-b border-b-[#3a3d4a] ">
      <div className="justify-between">
        <div>
          <UserHeader user={user!} />
        </div>
      </div>
    </div>
  );
}

export default Header