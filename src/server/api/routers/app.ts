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
    .mutation(({ ctx, input }) => {
      return ctx.db.app.create({
        data: {
          createdBy: { connect: { id: ctx.session.user.id } },
          name: input.name,
          url: input?.url,
        },
      });
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
