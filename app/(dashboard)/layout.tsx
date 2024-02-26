import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import SidebarOrganization from "./_components/SidebarOrganization";
import { toast } from "sonner";
import { Poppins } from "next/font/google";
import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "300", "200", "100", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mugi Chawn",
  description: "Mugi Chawn Dashboard",
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <SidebarOrganization />
      <main className={poppins.className}>{children}</main>
    </>
  );
};

export default DashboardLayout;
