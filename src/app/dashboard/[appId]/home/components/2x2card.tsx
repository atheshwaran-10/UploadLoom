import { ImagePost } from "@prisma/client";
import React from "react";

export default function Card2({
  title,
  items
}: {
  title: string;
  items:ImagePost[]
}) {
  return (
    <div className="col-span-2 rounded-lg border border-solid p-4 shadow-xl">
      <div className="">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div>
        {items.map((item, index) => (
          <div key={index} className="my-3 flex flex-row justify-between">
            <h2>{item.name}</h2>
            <p>
              {title === "Recent Uploads"
                ? item.createdAt.toDateString()
                : item.fileSize.toFixed(2) + " MB"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
