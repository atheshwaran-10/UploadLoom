import { getCurrentUser } from "@/hooks/getCurrentUser";
import Header from "../_components/Header/Header";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user=await getCurrentUser();
  if(!user)
  {
    return redirect("/");
  }
  return (
    <div className="">
      <div>
        <Header params={{
          appId: ""
        }} />
      </div>
      <div className="h-full ">{children}</div>
    </div>
  );
}
