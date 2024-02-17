
import { getServerSession } from "next-auth";

import { authOptions } from "@/server/auth";

export default async function getSession() {
  return await getServerSession(authOptions);
}
