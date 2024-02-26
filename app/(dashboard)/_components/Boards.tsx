"use client";
import Actions from "@/components/global/Actions";
import { Button } from "@/components/ui/button";
import { buttonVars } from "@/constant/framer-motion";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { handlePromise } from "@/utils/handlePromise";
import { useMutation, useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import FooterBoard from "./FooterBoard";
import { Skeleton } from "@/components/ui/skeleton";
import Overlay from "./Overlay";
import { Board } from "@/types/board";

const Boards = ({
  _id,
  title,
  userId,
  authorName,
  _creationTime,
  authorId,
  isFavorite,
  imageUrl,
}: Board) => {
  const author = authorId === userId ? " (You)" : authorName;
  const createdAt = formatDistanceToNow(_creationTime, {
    addSuffix: true,
  });
  const [isPending, startTransition] = useTransition();

  const id = _id as any;
  const toggleFavorite = useMutation(api.board.toggleFavorite);

  const handleFavorite = () => {
    startTransition(async () =>
      handlePromise(toggleFavorite({ id }), () => {
        toast.success(`Board ${isFavorite ? "unfavorited" : "favorited"}`);
      })
    );
  };

  const [hovered, setHovered] = useState<Record<string, boolean>>({});

  const handleHovered = (id: string) =>
    setHovered((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Link href={`/board/${id}`}>
      <motion.div
        layout
        className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden"
        onHoverStart={() => handleHovered(id)}
        onHoverEnd={() => handleHovered(id)}
      >
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="100% 100%"
            className="object-contain"
          />
          <Overlay />
          <Actions _id={id} title={title} side="right">
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <FooterBoard
          id={id}
          isFavorite={isFavorite}
          title={title}
          authorLabel={author}
          createdAtLabel={createdAt}
          onClick={handleFavorite}
          disabled={isPending}
          hovered={hovered}
        />
      </motion.div>
    </Link>
  );
};

Boards.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default Boards;
