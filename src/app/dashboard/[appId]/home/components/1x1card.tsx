import React from "react";


export default function Card1({title,count,filter}:{title:string,count:string,filter:string}) {
  return (
    <div className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1 rounded-lg border border-solid border-slate-400">
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-md mt-2 text-slate-400">{filter}</p>
        <div className="mt-4">{count}</div>
      </div>
    </div>
  );
}
