"use client";
import { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "./Cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      {/* draft pencils */}
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";
