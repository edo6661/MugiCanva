"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Hint } from "@/components/global/Hint";

const AddOrganization = () => {
  return (
    <ReuseableModal>
      <button className="mx-auto w-full bg-neutral-400/70 h-12 rounded-full border border-neutral-400/70">
        <Plus className=" mx-auto text-white" />
      </button>
    </ReuseableModal>
  );
};

export const AddWideOrganization = () => {
  return (
    <ReuseableModal>
      <Button variant="outline" className="w-full">
        Add Organization
      </Button>
    </ReuseableModal>
  );
};

export const ReuseableModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Hint
          label="Add Organization"
          side="right"
          align="center"
          sideOffset={18}
        >
          <div className="w-full">{children}</div>
        </Hint>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
export default AddOrganization;
