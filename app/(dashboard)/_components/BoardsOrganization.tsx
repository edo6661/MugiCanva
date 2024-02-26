"use client";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const BoardsOrganization = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");
  return (
    <div className="w-full fl-itc">
      <Button asChild variant={favorites ? "ghost" : "secondary"} size="sm">
        <Link href="/">
          <LayoutDashboard className="w-4 h-4 mr-2 " />
          Team Boards
        </Link>
      </Button>
      <Button asChild variant={favorites ? "secondary" : "ghost"} size="sm">
        <Link
          href={{
            pathname: "/",
            query: { favorites: "true" },
          }}
        >
          <Star className="w-4 h-4 mr-2 " />
          Favorite Boards
        </Link>
      </Button>
    </div>
  );
};

export default BoardsOrganization;
