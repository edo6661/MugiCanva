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
import { useRouter } from "next/navigation";
import { useAddBoard } from "@/store/useAddBoard";

interface Props {
  orgId: string;
}
const AddBoard = ({ orgId }: Props) => {
  const { isOpen, onOpen, onClose, initialValues } = useAddBoard();
  const [data, setData] = React.useState<Record<string, string>>({
    title: initialValues?.title,
    imageUrl: initialValues?.imageUrl,
  });
  const [isPending, startTransition] = useTransition();
  const create = useMutation(api.board.create);
  const handleAdd: FormEventHandler = (e) => {
    e.preventDefault();
    if (!orgId) return;
    startTransition(async () => {
      await handlePromise(
        create({ orgId, title: data.title, imageUrl: data.imageUrl }),
        () => {
          setData({});
          toast.success("Board created successfully");
          onClose();
        }
      );
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <button
        className={cn(
          "col-span-1 bg-neutral-400 hover:bg-neutral-400/70 shadow-md rounded-lg flex flex-col items-center justify-center py-6"
        )}
        onClick={() => onOpen()}
      >
        <div />
        <Plus className="h-12 w-12 text-white stroke-1" />
        <p className="text-sm text-white font-light">New board</p>
      </button>
      <DialogContent className="bg-transparent p-0 border-none">
        <form
          className="bg-white border w-full h-full p-12 rounded-2xl mx-auto space-y-4"
          onSubmit={handleAdd}
        >
          <Input
            placeholder="Board Name"
            name="title"
            onChange={(e) =>
              setData((data) => ({ ...data, title: e.target.value }))
            }
            required
            value={data.title}
          />
          <ImageUpload data={data} setData={setData} />
          <Button disabled={isPending} className="w-full">
            Add Board
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBoard;
