import React from 'react'
import Header from './components/Header'
import Card1 from './components/Current'
import Card2 from './components/Available'
import { getCurrentUser } from '@/hooks/getCurrentUser'
import { db } from '@/server/db'
const page = async({params}:{params:{appId:string}}) => {
  const user = await getCurrentUser();
  const app=await db.app.findFirst({where:{id:Number(params.appId)}});
  if(!user || !app)
  {
    return(
      <div>
        UnAuth
      </div>
    )
  }
  return (
    <div>
      <Header />
      <div className="px-10">
        <Card1 user={user!} app={app} />
      </div>
      <div className="mt-6 px-10">
        <Card2 user={user!} app={app} />
      </div>
    </div>
  );
}

export default page