"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useisFavorites } from "@/store/useIsFavorites";
interface Props {
  orgId: string;
}
const SearchInput = ({ orgId }: Props) => {
  const { isFavorite } = useisFavorites();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const boards = useQuery(api.boards.getBoards, { orgId: orgId ? orgId : "" });

  const handleSearch = useDebounceCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set("search", term) : params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  }, 500);

  const optPlaceholder =
    boards && boards.length > 0 && !isFavorite
      ? "Search boards"
      : isFavorite
      ? "Cant in favorites"
      : "Create a board";

  return (
    <div className=" relative fl-itc sm:w-full">
      <Search className="absolute left-2" />
      <Input
        className="pl-10 w-full"
        placeholder={optPlaceholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
        defaultValue={searchParams.get("search")?.toString() ?? ""}
        disabled={boards?.length === 0 || isFavorite}
      />
    </div>
  );
};

export default SearchInput;
