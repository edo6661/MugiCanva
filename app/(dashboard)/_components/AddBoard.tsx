import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { handlePromise } from "@/utils/handlePromise";
import { CreateOrganization } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { FormEventHandler, useTransition } from "react";
import { toast } from "sonner";
import "@uploadthing/react/styles.css";
import ImageUpload from "./ImageUpload";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  orgId: string;
}
const AddBoard = ({ orgId }: Props) => {
  const [data, setData] = React.useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const boards = useQuery(api.boards.getBoards, { orgId });
  const create = useMutation(api.board.create);
  const handleAdd: FormEventHandler = (e) => {
    e.preventDefault();
    if (!orgId) return;
    startTransition(async () => {
      await handlePromise(
        create({ orgId, title: data.title, imageUrl: data.imageUrl }),
        (id) => {
          toast.success("Board created successfully");
          setData({});
        }
      );
    });
  };

  const optTrigger = !boards?.length ? (
    <Button>Add First Board!</Button>
  ) : (
    <button
      className={cn(
        "col-span-1 bg-neutral-400 hover:bg-neutral-400/70 shadow-md rounded-lg flex flex-col items-center justify-center py-6"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">New board</p>
    </button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{optTrigger}</DialogTrigger>
      <DialogContent className="bg-transparent p-0 border-none">
        <form
          className="bg-white border w-full h-full p-12 rounded-2xl mx-auto space-y-4"
          onSubmit={handleAdd}
        >
          <Input
            placeholder="Board Name"
            name="title"
            onChange={(e) => setData({ title: e.target.value })}
          />
          <ImageUpload data={data} setData={setData} />
          <Button disabled={!data.title || isPending} className="w-full">
            Add Board
          </Button>
          <DialogClose asChild>
            <Button className=" w-full" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBoard;
