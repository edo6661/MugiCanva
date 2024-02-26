"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import useConvexMutation from "@/hooks/useConvexMutation";
import { useMutation } from "convex/react";
import { useTransition } from "react";
import { toast } from "sonner";
import { handlePromise } from "@/utils/handlePromise";
import { useRouter } from "next/navigation";
import AddBoard from "./AddBoard";
import CreateBoardEmpty from "./CreateBoardEmpty";

const EmptyBoard = () => {
  const { organization: org } = useOrganization();

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center text-center">
      <Image src="/frieren.png" height={200} width={200} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Create your first board!</h2>
      <p className="text-muted-foreground text-sm  mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <CreateBoardEmpty orgId={org?.id!} />
      </div>
    </div>
  );
};

export default EmptyBoard;
