"use client";

import { Hint } from "@/components/global/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Moon, Sun } from "lucide-react";
interface CanvasThemeProps {
  theme: "light" | "dark";
  updateTheme: (theme: "light" | "dark") => void;
}
const CanvasTheme = ({ theme, updateTheme }: CanvasThemeProps) => {
  return (
    <div className="container-theme ">
      <Hint label="Sun" side="bottom" sideOffset={12}>
        <Button
          variant={theme === "light" ? "boardActive" : "board"}
          className="px-2"
          onClick={() => updateTheme("light")}
        >
          <Sun />
        </Button>
      </Hint>
      <Hint label="Moon" side="bottom" sideOffset={12}>
        <Button
          variant={theme === "dark" ? "boardActive" : "board"}
          className="px-2"
          onClick={() => updateTheme("dark")}
        >
          <Moon />
        </Button>
      </Hint>
    </div>
  );
};

export const CanvasThemeSkeleton = () => {
  return (
    <div className="container-theme ">
      {Array.from({ length: 2 }, (_, i) => (
        <Skeleton
          key={i}
          className="w-[40px] h-[40px] px-2 bg-muted-foreground"
        />
      ))}
    </div>
  );
};

export default CanvasTheme;
