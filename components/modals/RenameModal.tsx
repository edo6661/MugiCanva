"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/useRenameModal";

import React, {
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { handlePromise } from "@/utils/handlePromise";
import { toast } from "sonner";

const RenameModal = () => {
  const { isOpen, initialValues, onClose } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const [isPending, startTransition] = useTransition();
  const update = useMutation(api.board.update);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const id = initialValues.id as any;
    startTransition(async () =>
      handlePromise(update({ id, title }), () => {
        toast.success(`Board title updated to ${title} successfully`);
        onClose();
      })
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            required
            maxLength={60}
            value={title}
            onChange={handleChange}
            placeholder="Board title"
            disabled={isPending}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
