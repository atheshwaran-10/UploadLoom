import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { db } from "@/server/db";

export const UserRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    const res = ctx.db.user.findMany({});
    return res;
  }),
  getById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      const res = ctx.db.user.findFirst({ where: { id: input.userId } });
      return res;
    }),
  getCurrent: protectedProcedure.query(({ ctx }) => {
    const res = ctx.db.user.findFirst({where:{id:ctx.session.user.id}});
    return res;
  }),
});
