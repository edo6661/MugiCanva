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
import { useBoard } from "@/store/useBoard";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardsList = ({ orgId, query }: Props) => {
  const { board, setBoard } = useBoard();
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toString() ?? "";
  const favorites = searchParams.get("favorites")?.toString() ?? "";
  const boards = useQuery(api.boards.getBoards, { orgId, search, favorites });

  useEffect(() => {
    if (boards) {
      setBoard(boards);
    }
  }, [boards, setBoard, search, favorites]);

  const { userId } = useAuth();

  if (boards === undefined) return <LoadingBoards />;
  else if (!boards?.length) {
    if (query.search) return <EmptySearch />;
    else if (query.favorites) return <EmptyFavorites />;
    else return <EmptyBoard />;
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <AddBoard orgId={orgId} />
        {board?.map((b) => (
          <Boards
            key={b._id}
            {...b}
            userId={userId!}
            isFavorite={b.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardsList;
