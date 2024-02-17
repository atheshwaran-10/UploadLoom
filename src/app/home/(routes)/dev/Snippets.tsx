"use client"
import React from "react";
import { Tabs, Tab, Card, CardBody, Snippet } from "@nextui-org/react";

export default function Snippets() {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" className="flex justify-center items-center">
        <Tab key="javascript" title="Javascript">
          <Card>
            <CardBody>
              <Snippet>
                <code style={{ whiteSpace: "pre-wrap" }}>
                  {`const res = await fetch(
  \`uploadloom.vercel.app/api/upload?name=Your_Image_Name&type=Your_Image_Type\`,
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
            </CardBody>
          </Card>
        </Tab>
        <Tab key="python" title="Python">
          <Card>
            <CardBody>
              <Snippet>
                <code style={{ whiteSpace: "pre-wrap" }}>{`import requests

url = 'https://uploadloom.vercel.app/api/upload'
params = {'name': 'Your_Image_Name', 'type': 'Your_Image_Type'}
headers = {'userid': YOUR_API_KEY}  
data = {'base64': YOUR_IMAGE_IN_BASE_URI}  

response = requests.post(url, params=params, headers=headers, data=data)

if response.status_code == 200:
    print("Request successful")
    print("Response:", response.text)
else:
    print("Request failed with status code:", response.status_code)

`}</code>
              </Snippet>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="curl" title="CURL">
          <Card>
            <CardBody>
              <Snippet>
                <code style={{ whiteSpace: "pre-wrap" }}>
                  {`curl -X POST 
-H "userid: <user_id_value>" 
-d "base64=<YOUR_IMAGE_DATA>" 
"https://uploadloom.vercel.app/api/upload?name=Your_Image_Name&type=Your_Image_Type"
`}
                </code>
              </Snippet>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}


