import Actions from "@/components/global/Actions";
import { Hint } from "@/components/global/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/useRenameModal";
import { randomImages } from "@/utils";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return <div className="text-neutral-300 sm:px-2 px-1">|</div>;
};
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Info = ({ boardId }: InfoProps) => {
  const [image, setImage] = useState("");
  const { onOpen } = useRenameModal();
  const board = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  useEffect(() => {
    if (!image) {
      const randomImage =
        randomImages[Math.floor(Math.random() * randomImages.length)];
      setImage(randomImage);
    }
  }, [image]);
  return (
    <div className=" top-2 left-2 absolute bg-white rounded-md sm:px-2 px-1 h-16 flex items-center shadow-md">
      {/* pake aschild karena pake link didalam button nya */}
      <Hint label="Go to boards" side="bottom" sideOffset={12}>
        <Button asChild className="sm:px-2 px-1" variant="board">
          <Link href="/">
            {image && (
              <Image
                src={image}
                alt="logo"
                width={40}
                height={40}
                className="object-contain"
              />
            )}
            <span
              className={cn(
                " font-semibold text-xl ml-2 text-black",
                poppins.className
              )}
            >
              Chawn
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={12}>
        <Button
          variant="board"
          className=" text-base font-normal sm:px-2 px-1"
          onClick={() => onOpen(board?._id as Id<"boards">, board?.title!)}
        >
          {board?.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        _id={board?._id as string}
        title={board?.title!}
        side="bottom"
        sideOffset={12}
      >
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={12}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

Info.skeleton = () => {
  return (
    <div className=" top-2 left-2 absolute rounded-md flex items-center shadow-md w-[300px] h-14">
      <Skeleton className=" w-[136px] h-[40px] bg-muted-foreground rounded-xl" />
      <TabSeparator />
      <Skeleton className=" w-[50px] h-[40px] bg-muted-foreground rounded-xl" />
      <TabSeparator />
      <Skeleton className=" w-[40px] h-[40px] bg-muted-foreground rounded-full" />
    </div>
  );
};

export default Info;
