"use client";
import React from "react";
import ListOrganization from "./ListOrganization";
import { useOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const SidebarOrganization = () => {
  const { organization } = useOrganization();

  return (
    <aside
      className={cn(
        "fixed z-[1] top-0 left-0 bg-white shadow-md h-full w-[80px]  flex p-4 flex-col gap-y-4 text-white",
        {
          hidden: !organization,
        }
      )}
    >
      <ListOrganization />
    </aside>
  );
};

export default SidebarOrganization;
