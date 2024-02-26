"use client";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import ItemsOrganization from "./ItemsOrganization";
import { Plus } from "lucide-react";
import { Hint } from "@/components/global/Hint";
import AddOrganization from "./AddOrganization";
import InviteOrganization from "./InviteOrganization";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingBoards from "./LoadingBoards";
const ListOrganization = () => {
  const { organization } = useOrganization();
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  if (!userMemberships.data?.length || !organization)
    return <ListOrganizationSkeleton />;
  return (
    <div className="flex flex-col items-center gap-2">
      <AddOrganization />
      {organization && <InviteOrganization />}
      {userMemberships.data.map((mem) => {
        return (
          <ItemsOrganization key={mem.organization.id} {...mem.organization} />
        );
      })}
    </div>
  );
};

export const ListOrganizationSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="w-[48px] h-[48px] rounded-full" />
      ))}
    </div>
  );
};

export default ListOrganization;
