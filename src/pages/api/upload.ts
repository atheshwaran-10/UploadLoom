// src/pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "@/types/Request";
import { REST as Discord } from "discord.js";
import { env } from "@/env";
import { db } from "@/server/db";
import { user } from "@nextui-org/react";

interface Request extends NextApiRequest {
  query: {
    name: string;
    type: string;
    appId: string;
  };
  headers: {
    userid?: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response<unknown, unknown>>,
) {
  const { name, type, appId } = req.query;
  const userId = req.headers["userid"];
  console.log(userId);
  if (!userId) {
    return res.status(401).json({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: "UnAuthorized",
      error: Status.Error,
      success: Status.Success,
    });
  }

  const image = req.body;
  const buff = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64",
  );
  const base64SizeInBytes = image.length;
  const estimatedDecodedSizeInBytes = base64SizeInBytes * 0.75;
  const fileSize = estimatedDecodedSizeInBytes / (1024 * 1024);

  const client = new Discord({ version: "10" }).setToken(env.DISCORD_TOKEN);

  try {
    const app = await db.app.findFirst({
      where: {
        id: Number(appId),
      },
    });

    if (!app) {
      return res.status(500).json({
        success: Status.Error,
        error: "App not found",
      });
    }
    const images = await db.imagePost.findMany({
      where: {
        userId: userId,
        appId: Number(appId),
      },
    });

    const totalFileSize = images.reduce((agg, item) => {
      return agg + item.fileSize;
    }, 0);

    if (fileSize + totalFileSize > app?.appLimit) {
      return res.status(500).json({
        success: Status.Error,
        error: "Your Limit has been exhausted",
      });
    }
    
    const resp = await client.post(
      `/channels/${env.DISCORD_CHANNEL_ID}/messages`,
      {
        files: [
          {
            name: name + "." + type,
            data: buff,
            contentType: type,
          },
        ],
      },
    );

    await db.imagePost
      .create({
        data: {
          name: name,
          //@ts-ignore
          imgUrl: resp.attachments[0].url,
          appId: Number(appId),
          userId: userId,
          fileSize,
        },
      })
      .then(() => {
        console.log("Created");
      });

    return res.status(200).json({
      success: Status.Success,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: resp.attachments[0].url,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
