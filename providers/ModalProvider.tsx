"use client";
import { useEffect, useState } from "react";
import RenameModal from "@/components/modals/RenameModal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  // ! useEffect only run when its finally to render on client side and set isMounted to true to render the modal, this is because the modal is not rendered on the server side and we need to wait for the client side to render it and then set isMounted to true to render the modal on the client side only and not on the server side.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <>
      <RenameModal />
    </>
  );
}
