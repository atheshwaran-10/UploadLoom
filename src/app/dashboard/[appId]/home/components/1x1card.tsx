import React from "react";


export default function Card1({title,count,filter}:{title:string,count:string,filter:string}) {
  return (
    <div className="rounded-lg border border-solid shadow-xl">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-md mt-2 text-slate-400">{filter}</p>
        <div className="mt-4">
          {count}
        </div>
      </div>
    </div>
  );
}
