import React from 'react'
import { api } from '@/trpc/server'

import { getCurrentUser } from '@/hooks/getCurrentUser'
import UploadForm from '../_components/Forms/UploadForm'


const page = async() => {
   const currentUser=await getCurrentUser();
   let images: {
     id: number;
     name: string;
     createdAt: Date;
     updatedAt: Date;
     userId: string;
     imgUrl: string;
   }[] = [];
   if(currentUser)
       images= await api.image.getAll.query({userId:currentUser.id})
  return (
    <div className="flex h-screen w-full items-center justify-center rounded-lg border border-white p-5">
      <div className='w-1/3 mb-4'>
        <UploadForm user={currentUser!} />
      </div>
    </div>
  );
}
export default page