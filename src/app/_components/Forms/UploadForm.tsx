"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import placeholder from "~/public/images/placeholder.png";
import { toast } from "react-hot-toast";
import FileUpload from "./FileUpload";
import { User } from "@prisma/client";
import { trpc } from "@/lib/trpc";
import { Button, Input } from "@nextui-org/react";
import { NextResponse } from "next/server";

export const UploadForm = ({
  user,
  onClose,
  appId,
}: {
  onClose?: () => void;
  user: User;
  appId: string;
}) => {
  const [avatarView, setAvatarView] = useState(true);
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const utils = trpc.useContext();
  const createPost = trpc.image.postImage.useMutation({
    onSuccess: () => {},
  });

  const onSubmit = async (input: File | null) => {
    try {
      if (!input) {
        return;
      }

      if (name.length > 15) {
        toast.error("Name should be maximum length of 15");
        return;
      }
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = async () => {
        toast.loading("Uploading...");
        const base64 = reader.result as string;

     
        const ext = input.name.split(".").pop();

        const res = await fetch(
          `/api/upload?name=${name}&type=${ext}&appId=${appId}`,
          {
            method: "POST",
            headers: {
              userid: user.id,
            },
            body: base64,
          },
        );
        const data: {
          data: string;
          success: number;
        } = await res.json();
        setLoading(false);
        if (data.success === 0) {
          toast.dismiss();
          toast.success("Successfully uploaded the image!");
          utils.image.getAll.invalidate({ userId: user.id, appId: appId });
          if (onClose) onClose();
        }
      };
      if (onClose) onClose();
    } catch (err) {
      toast.error("Upload failed");
      console.log(err);
    } finally {
      if (onClose) onClose();
    }
  };

  return (
    <div className="grid w-full ">
      <div className="col-span-1 w-full">
        {image && avatarView ? (
          <Image
            src={URL.createObjectURL(image)}
            height={300}
            width={500}
            alt=""
            className="cursor-pointer rounded-lg"
            onClick={() => setAvatarView(false)}
          />
        ) : (
          <FileUpload
            image={image}
            setImage={setImage}
            setAvatarView={setAvatarView}
          />
        )}
        <div className="m-5 flex flex-row">
          <Input
            size="lg"
            isRequired
            type="text"
            label="Image Name"
            value={name}
            onValueChange={setName}
            labelPlacement="inside"
            className=" text-xl"
          />
        </div>
        <div className="flex w-full justify-center">
          <Button
            color="default"
            disabled={image && name ? false : true}
            onClick={() => onSubmit(image || null)}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
