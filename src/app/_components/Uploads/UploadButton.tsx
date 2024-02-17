
"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { User } from '@prisma/client';
import { trpc } from '@/lib/trpc';
interface UploadButtonProps{
  user:User
}

const UploadButton:React.FC<UploadButtonProps> = ({user}) => {

  const [image,setImage]=useState<File|null>(null);

   const uploadImg = async (input: File) => {
     if (!input) {
       return;
     }
     const reader = new FileReader();
     
     reader.readAsDataURL(input);
     reader.onload = async () => {
       toast("Uploading...");
       const base64 = reader.result as string;
      
       const ext = input.name.split(".").pop();
       const name = input.name.split(".").slice(0, -1);
       console.log(user.id)

       const res = await fetch(
         `/api/upload?name=${name}&type=${ext}${"image1"}"}`,
         {
           method: "POST",
           headers:{
            "userid":user.id
           },
           body:base64
         },
       );
       const data = await res.json();
       if (data.success === 0) {
        toast("Successfully uploaded the image!");
        

       }
     };
   };
  return (
    <div>
      <Input
        type="file"
        onChange={(e) => {
          setImage(e?.target?.files![0]!);
        }}
      />
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          height={400}
          width={400}
          alt=""
        />
      )}
      <div className="flex w-full items-center justify-center">
        <button
          onClick={async () => {
            uploadImg(image!);
          }}
          className="w-fit flex-grow rounded-md border-2 border-rose-500 px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-500 hover:text-white"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadButton;