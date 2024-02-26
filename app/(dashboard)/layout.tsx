import { Button } from "@/components/ui/button";
import Header from "./_components/Header";
import SidebarOrganization from "./_components/SidebarOrganization";
import { toast } from "sonner";
import { Poppins } from "next/font/google";

interface Props {
  children: React.ReactNode;
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "300", "200", "100", "800", "900"],
});

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
