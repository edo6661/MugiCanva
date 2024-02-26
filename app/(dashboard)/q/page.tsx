"use client";
import { useOrganization } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useisFavorites } from "@/store/useIsFavorites";
import EmptyOrganization from "../_components/EmptyOrganization";
import BoardsList from "../_components/BoardsList";
import { motion } from "framer-motion";
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
      <article
        className={cn("pl-[92px] pr-2 py-4", {
          "container pl-2": !organization,
        })}
      >
        {!organization ? (
          <EmptyOrganization />
        ) : (
          <BoardsList orgId={organization.id} query={searchParams} />
        )}
      </article>
    </section>
  );
};

export default DashboardPage;
