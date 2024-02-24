import React from 'react'
import UserHeader from "./UserHeader";
import { getCurrentUser } from '@/hooks/getCurrentUser';
const Header = async ({params}:{params:{appId:string}}) => {
  console.log("Appid",params)
  const user=await getCurrentUser();
  return (
    <div className="border-b border-b-[#e8e8e8] pb-5 ">
      <div className="justify-between">
        <div className=''>
          <UserHeader user={user!} />
        </div>
      </div>
    </div>
  );
}

export default Header