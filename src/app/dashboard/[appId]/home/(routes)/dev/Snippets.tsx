"use client";
import React from "react";
import { Tabs, Tab, Snippet } from "@nextui-org/react";

export default function Snippets() {
  return (
    <div className="flex flex-col">
      <div className="m-6 text-xl font-semibold ">Examples</div>
      <Tabs
        aria-label="Options"
        className=" !text-purple-500"
        variant="underlined"
      >
        <Tab key="javascript" title="Javascript" className="text-purple-500">
          <Snippet hideSymbol>
            <code style={{ whiteSpace: "pre-wrap" }}>
              {`const res = await fetch(
  \`uploadloom.vercel.app/api/upload?name=Your_Image_Name&type=Your_Image_Type&appId=Your_App_ID\`,
  {
    method: "POST",
    headers: {
      "userid": YOUR_API_KEY
    },
    body: YOUR_IMAGE_IN_BASE_URI
  }
);`}
            </code>
          </Snippet>
        </Tab>
        <Tab key="python" title="Python" className="text-purple-500 ">
          <Snippet hideSymbol>
            <code style={{ whiteSpace: "pre-wrap" }}>{`import requests

url = "https://uploadloom.vercel.app/api/upload"
params = {
    "name": "Your_Image_Name",
    "type": "Your_Image_Type",
    "appId": "Your_App_ID"
}
headers = {
    "userid": "YOUR_API_KEY"
}
data = {
    "image": "YOUR_IMAGE_IN_BASE_URI"
}

response = requests.post(url, params=params, headers=headers, json=data)

`}</code>
          </Snippet>
        </Tab>
        <Tab key="curl" title="CURL">
          <Snippet hideSymbol>
            <code style={{ whiteSpace: "pre-wrap" }}>
              {`curl -X POST 
  'https://uploadloom.vercel.app/api/upload?name=Your_Image_Name&type=Your_Image_Type&appId=Your_App_ID' 
  -H 'userid: YOUR_API_KEY' 
  -d '{
    "image": "YOUR_IMAGE_IN_BASE_URI"
  }'
`}
            </code>
          </Snippet>
        </Tab>
      </Tabs>
    </div>
  );
}
