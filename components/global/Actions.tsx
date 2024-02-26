import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import React, { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { handlePromise } from "@/utils/handlePromise";
import ConfirmModal from "./ConfirmModal";
import { Button } from "../ui/button";
import { useRenameModal } from "@/store/useRenameModal";

interface Props {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  _id: string;
  title: string;
}
const Actions = ({ children, side, sideOffset, _id, title }: Props) => {
  const { onOpen } = useRenameModal();
  const [isPending, startTransition] = useTransition();
  const remove = useMutation(api.board.remove);
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${_id}`)
      .then(() => toast.success("Link copied to clipboard"))
      .catch(() => toast.error("Failed to copy link"));
  };
  const onDelete = () => {
    // ! gk punya type nya yh gk tau convex
    const id = _id as any;
    startTransition(async () =>
      handlePromise(remove({ id }), () => {
        toast.success(`${title} deleted successfully`);
      })
    );
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className=" w-60"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
          <Link2 className="w-4 h-4 mr-2" />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem
          className="p-3 cursor-pointer"
          onClick={() => onOpen(_id, title)}
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        {/* // ! kalo gapake DropdownMenuItem di DropdownMenu gaakan nge hapus dropdown yang isinya copyclipboard  */}
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its contents."
          disabled={isPending}
          onConfirm={onDelete}
        >
          <Button
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
            variant="ghost"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
