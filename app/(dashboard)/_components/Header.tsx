"use client";
import { UserButton, useOrganization } from "@clerk/nextjs";
import React from "react";
import SwitcherOrganization from "./SwitcherOrganization";
import SearchInput from "./SearchInput";
import DropdownBoards from "./DropdownBoards";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "900", "800"],
  subsets: ["latin"],
});

const Header = () => {
  const { organization } = useOrganization();
  return (
    <header className={cn("shadow-md", montserrat.className)}>
      <nav
        className={cn(
          "pl-[92px] justify-between sm:fl-itc sm:space-y-0 space-y-2 pr-2 py-2 gap-4",
          {
            "container pl-2": !organization,
          }
        )}
      >
        <div className="fl-itc gap-1 justify-between">
          <SearchInput orgId={organization?.id!} />
          <div className="container-profile">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="fl-itc gap-2 justify-between ">
          {organization && (
            <>
              <SwitcherOrganization />
              <DropdownBoards />
            </>
          )}

          <div className="sm:block hidden">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                },
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
