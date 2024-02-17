import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const ImageRouter=createTRPCRouter({
  getAll:protectedProcedure
        .input(z.object({userId:z.string()}))
        .query(({ctx,input})=>{
          const res = ctx.db.imagePost.findMany({
            where: {
              userId: input.userId,
            },
            orderBy: { createdAt: "desc" },
          });
          return res;
        }),
  postImage:protectedProcedure
        .input(z.object({userId:z.string(),imgUrl:z.string(),name:z.string()}))
        .mutation(({ctx,input})=>{
           ctx.db.imagePost.create({
            data:{
              userId:input.userId,
              imgUrl:input.imgUrl,
              name:input.name
            }
          })
        })
})