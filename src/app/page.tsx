import { getServerAuthSession } from "@/server/auth";
import HeroSection from "./Hero";
import main from "./Hero/hero.module.css";
import LandingHeader from "./_components/Header/LandingHeader";
import { cn } from "@/lib/utils";
import Pricing from "./pricing/Pricing";
import FAQ from "./FAQ";

export default async function HomePage() {
  const auth = await getServerAuthSession();

  return (
    <div className="">
      <div>
        <LandingHeader signedIn={auth?.user.name ? true : false} />
      </div>
      <div className={cn(main.app_container) + " mt-8 flex justify-center"}>
        <div className={cn(main.main_div)}></div>
        <div className="absolute">
          <main className="flex  flex-col items-center justify-center  overflow-hidden p-4 md:p-8 ">
            <HeroSection signedIn={auth?.user.name ? true : false} />
            <div className="flex h-full w-full items-center justify-center md:w-[60%]">
              <div className="flex w-full flex-col items-center justify-center gap-2"></div>
            </div>
          </main>
        </div>
      </div>
      <div className="-mt-16 w-full">
        <Pricing />
      </div>
      <div className="flex justify-center py-6">
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
          <FAQ />
        </div>
      </div>
      <div id="footer" className="text-md m-4 mt-8  text-center font-semibold">
        <p>&copy; UploadLoom 2024</p>
      </div>
    </div>
  );
}
