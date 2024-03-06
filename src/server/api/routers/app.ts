import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const AppRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      const res = ctx.db.app.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          ImagePost: true,
        },
        orderBy: { createdAt: "desc" },
      });
      return res;
    }),
  createApp: protectedProcedure
    .input(z.object({ name: z.string(), url: z.optional(z.string()) }))
    .mutation(async({ ctx, input }) => {
      const res=await ctx.db.app.create({
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          name: input.name,
          url: input?.url,
        },
      });
      const targetUser=await db.user.findFirst({
        where:{
          id:ctx.session.user.id
        }
      })
      if(!targetUser)
      {
        return "User not found"
      }
      await ctx.db.user.update({
        where:{
          id:ctx.session.user.id,
        },
        data:{
          userLimit:targetUser.userLimit-1
        }
      })
      return res;
    }),
  EditApp: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        url: z.optional(z.string()),
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.app.update({
        where: {
          id: input.id,
        },
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          name: input.name,
          url: input?.url,
        },
      });
    }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.app.findFirst({
        where: {
          id: input.id,
        },
        
      });
    }),
});
