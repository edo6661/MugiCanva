"use client";
import { useOrganization } from "@clerk/nextjs";
import EmptyOrganization from "./_components/EmptyOrganization";
import BoardsList from "./_components/BoardsList";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AddOrganization from "./_components/AddOrganization";
import InviteOrganization from "./_components/InviteOrganization";
import BoardsOrganization from "./_components/BoardsOrganization";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import axios from "axios";
import ImageUpload from "./_components/ImageUpload";
import { useisFavorites } from "@/store/useIsFavorites";
import { useSearchParams } from "next/navigation";

interface Props {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: Props) => {
  const { organization } = useOrganization();
  const { setIsFavorite } = useisFavorites();
  const searchParam = useSearchParams();

  useEffect(() => {
    setIsFavorite(searchParams.favorites === "true");
  }, [setIsFavorite, searchParams, searchParam]);
  return (
    <main className={cn(" bg-neutral-200 min-h-screen", {})}>
      <section
        className={cn("pl-[92px] pr-2 py-4", {
          "container pl-2": !organization,
        })}
      >
        {!organization ? (
          <EmptyOrganization />
        ) : (
          <BoardsList orgId={organization.id} query={searchParams} />
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
