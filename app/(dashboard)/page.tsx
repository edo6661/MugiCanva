"use client";
import { useOrganization } from "@clerk/nextjs";
import EmptyOrganization from "./_components/EmptyOrganization";
import BoardsList from "./_components/BoardsList";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useisFavorites } from "@/store/useIsFavorites";

interface Props {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: Props) => {
  const { organization } = useOrganization();
  const { setIsFavorite } = useisFavorites();

  useEffect(() => {
    setIsFavorite(searchParams.favorites === "true");
  }, [setIsFavorite, searchParams]);
  return (
    <section className={cn(" bg-neutral-200 min-h-screen", {})}>
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
    </section>
  );
};

export default DashboardPage;
