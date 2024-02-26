import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { upperFirst } from "@/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  transitionHoveredBoard,
  varsHoveredBoard,
} from "@/constant/framer-motion";

interface FooterProps {
  id: string;
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
  hovered: Record<string, boolean>;
}

export default function FooterBoard({
  id,
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
  hovered,
}: FooterProps) {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  };

  return (
    <div className="relative bg-white p-3 space-y-1">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
        {upperFirst(title)}
      </p>
      <AnimatePresence>
        {hovered[id] && (
          <motion.div
            variants={varsHoveredBoard}
            transition={transitionHoveredBoard}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-1"
          >
            <p className=" text-[11px] text-muted-foreground truncate">
              {upperFirst(authorLabel)}, {createdAtLabel}
            </p>
            <button
              disabled={disabled}
              onClick={handleClick}
              className={cn(
                " absolute top-3 right-3 text-muted-foreground hover:text-blue-600",
                disabled && "cursor-not-allowed opacity-75"
              )}
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  isFavorite && "fill-blue-600 text-blue-600"
                )}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
