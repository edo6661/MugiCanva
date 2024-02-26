"use client";

import Loading from "./_components/Loading";
import { Canvas } from "./_components/Canvas";
import { Room } from "@/components/liveblocks/Room";
interface BoardProps {
  params: {
    id: string;
  };
}
const Board = ({ params }: BoardProps) => {
  return (
    <>
      <Room roomId={params.id} fallback={<Loading />}>
        <Canvas boardId={params.id} />
      </Room>
    </>
  );
};

export default Board;
