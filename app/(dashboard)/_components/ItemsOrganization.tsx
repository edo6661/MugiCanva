"use client";

import { Hint } from "@/components/global/Hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  id: string;
  name: string;
  imageUrl: string;
}

const ItemsOrganization = ({ name, id, imageUrl }: Props) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActiveOrg = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };
  return (
    <>
      <Hint label={name} side="right" align="center" sideOffset={16}>
        <Image
          className={cn(
            "rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-all duration-300 border-neutral-400/70 border",
            {
              "opacity-100": isActiveOrg,
            }
          )}
          width={60}
          height={60}
          src={imageUrl}
          alt={name}
          onClick={onClick}
        />
      </Hint>
    </>
  );
};

export default ItemsOrganization;
