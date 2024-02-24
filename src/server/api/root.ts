import { postRouter } from "@/server/api/routers/post";
import { ImageRouter } from "@/server/api/routers/image";
import { createTRPCRouter } from "@/server/api/trpc";
import { AppRouter } from "@/server/api/routers/app";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  image:ImageRouter,
  app:AppRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
