"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LayoutDashboard, Star } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { upperFirst } from "@/utils";

export default function DropdownBoards() {
  const [board, setBoard] = React.useState("team");
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname.includes("/q")) {
      setBoard("favorites");
    } else {
      setBoard("team");
    }
  }, [pathname]);

  // ! idk why only work in development
  // const router = useRouter();
  // const searchParams = useSearchParams();
  // const favorites = searchParams.get("favorites");

  // React.useEffect(() => {
  //   if (favorites) {
  //     return setBoard("favorites");
  //   }
  //   return setBoard("team");
  // }, [favorites]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {board ? upperFirst(board) : "Boards"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={board} onValueChange={setBoard}>
          <DropdownMenuRadioItem value="team" className=" mx-auto p-0">
            <Link href="/" className="fl-itc gap-2 h-full w-full py-2 px-8">
              <LayoutDashboard className="w-4 h-4 mr-2 " />
              Team Boards
            </Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="favorites" className=" mx-auto p-0">
            <Link
              href={{
                pathname: "/q",
                query: { favorites: "true" },
              }}
              className="fl-itc gap-2 h-full w-full py-2 px-8"
            >
              <Star className="w-4 h-4 mr-2 " />
              Favorite Boards
            </Link>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
