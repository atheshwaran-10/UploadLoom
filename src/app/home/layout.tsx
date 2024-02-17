import SideBar from "../_components/LayoutComponents/SideBar";
import Header from "../_components/Header/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid-cols-15 grid">
      <div className="col-span-1 h-full border-r border-r-[#3a3d4a] bg-black ">
        <SideBar />
      </div>
      <div className="col-span-14  h-full bg-black">
        <div>
          <Header />
        </div>
        {children}
      </div>
    </div>
  );
}
