
import { db } from "@/server/db";

import getSession from "./getSession";

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user?.email) {
    return null;
  }
  const user = await db.user.findFirst({
    where: {
      email: session.user.email,
    },
  });
  return user;
}
