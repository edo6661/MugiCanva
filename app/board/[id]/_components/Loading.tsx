"use client";
import React from "react";
import Participants from "./Participants";
import Toolbar from "./Toolbar";
import Info from "./Info";
import { CanvasThemeSkeleton } from "./CanvasTheme";

const Loading = () => {
  return (
    <main className="min-h-screen w-full relative bg-neutral-200 touch-none">
      <Info.skeleton />
      <Participants.skeleton />
      <Toolbar.skeleton />
      <CanvasThemeSkeleton />
    </main>
  );
};

export default Loading;
