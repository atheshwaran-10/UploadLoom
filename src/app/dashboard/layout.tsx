import Header from "../_components/Header/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div>
        <Header />
      </div>
      <div className="h-full ">{children}</div>
    </div>
  );
}