import { OrganizationProfile } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/global/Hint";
import { UserRoundPlus } from "lucide-react";

export default function InviteOrganization() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full">
          <Hint
            label="Invite organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button className="mx-auto bg-neutral-400/70 w-full h-12 rounded-full border border-neutral-400/70">
              <UserRoundPlus className="mx-auto text-white " />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[900px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  );
}
