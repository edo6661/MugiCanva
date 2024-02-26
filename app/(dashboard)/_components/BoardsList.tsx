"use client";
import EmptyBoard from "./EmptyBoard";
import { EmptyFavorites } from "./EmptyFavorites";
import { EmptySearch } from "./EmptySearch";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Title } from "@/components/ui/custom/Title";
import { useAuth } from "@clerk/nextjs";
import AddBoard from "./AddBoard";
import Boards from "./Boards";
import LoadingBoards from "./LoadingBoards";
import { useCallback, useEffect, useState } from "react";
import { ResponseBoard } from "@/types/board";

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardsList = ({ orgId, query }: Props) => {
  const data = useQuery(api.boards.getBoards, { orgId, ...query });
  const [boards, setBoards] = useState<ResponseBoard[]>([]);
  useEffect(() => {
    if (data) setBoards(data);
  }, [data, query]);
  const { userId } = useAuth();

  if (data === undefined) return <LoadingBoards />;

  if (!data?.length && query.search) return <EmptySearch />;
  if (!data?.length && query.favorites) return <EmptyFavorites />;
  if (!data?.length) return <EmptyBoard />;

  return (
    <article>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <AddBoard orgId={orgId} />
        {boards?.map((board) => (
          <Boards
            key={board._id}
            {...board}
            userId={userId!}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </article>
  );
};

export default BoardsList;
