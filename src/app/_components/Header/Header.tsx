import React from 'react'
import UserHeader from "./UserHeader";
import { getCurrentUser } from '@/hooks/getCurrentUser';
import { db } from '@/server/db';
const Header = async ({params}:{params:{appId:string}}) => {
  const user=await getCurrentUser();
  if(!user)
  {
    return(
      <>
        Unauthorized
      </>
    )
  }
  const apps=await db.app.findMany({where:{userId:user.id}})
  return (
    <div className="border-b border-b-[#e8e8e8] pb-5 ">
      <div className="justify-between">
        <div className="">
          <UserHeader user={user!} apps={apps} />
        </div>
      </div>
    </div>
  );
}

export default Header