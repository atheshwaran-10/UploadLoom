import "@/styles/globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "./_components/providers/ToastProvider";
import { TRPCReactProvider } from "@/trpc/react";
import UiProvider from "./_components/providers/NextUiProvider";
import AuthContext from "@/context/AuthContext";
import Footer from "./Footer";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: " Upload Loom",
  description: "Generated by create-t3-app",
  icons: [
    {
      rel: "icon",
      url: "https://cdn.discordapp.com/attachments/1203013470300143616/1215723380716601384/UL.png?ex=65fdc9a1&is=65eb54a1&hm=03fc2939759fe24e5c2e6a98918f41e51d1cdf40b82a19040f523698a19b39c5&",
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html lang="en" className="bg-[#f3f3f3]">
        <body className={`font-sans ${inter.variable} bg-[#f3f3f3]`}>
          <TRPCReactProvider>
            <ToastProvider />
            <UiProvider>
              <div className="h-full bg-[#f3f3f3]">
                <div>{children}</div>
              </div>
            </UiProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </AuthContext>
  );
}
