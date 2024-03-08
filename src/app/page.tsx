import { getServerAuthSession } from "@/server/auth";
import HeroSection from "./Hero";
import main from "./Hero/hero.module.css";
import LandingHeader from "./_components/Header/LandingHeader";
import { cn } from "@/lib/utils";
export default async function HomePage() {
  const auth = await getServerAuthSession();

  return (
    <div className={cn(main.main_div)}>
      <div>
        <LandingHeader signedIn={auth?.user.name ? true : false} />
      </div>
      <main className="flex  flex-col items-center justify-center  overflow-hidden p-4 md:p-8 ">
        <HeroSection signedIn={auth?.user.name ? true : false} />
        <div className="flex h-full w-full items-center justify-center md:w-[60%]">
          <div className="flex w-full flex-col items-center justify-center gap-2"></div>
        </div>
      </main>
    </div>
  );
}
