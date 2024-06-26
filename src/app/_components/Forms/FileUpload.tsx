import { Input } from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import React, { Dispatch, SetStateAction } from 'react'

interface FileUploadProps{
  image:File | null,
  setImage:Dispatch<SetStateAction<File |  null>>
  setAvatarView:Dispatch<SetStateAction<boolean>>
}

const FileUpload:React.FC<FileUploadProps> = ({
  image,setImage,setAvatarView
}) => {
  return (
    <div className="flex w-full items-center justify-center">
      <Label
        id="dropzone-file"
        className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300  hover:bg-gray-100 "
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          id="dropzone-file"
          accept="image/gif, image/svg+xml, image/png, image/jpeg"
          type="file"
          className="hidden"
          size={5242880}
          onChange={(e) => {
            if (e?.target?.files) {
              setImage(e.target.files[0] ?? null);
              setAvatarView(true);
            }
          }}
        />
      </Label>
    </div>
  );
}

export default FileUpload