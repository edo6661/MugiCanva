"use client";

import { colorRgbToHex, colors } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}
export const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-right border-neutral-200">
      {colors.map((color, index) => (
        <ColorButton key={index} onClick={onChange} color={color} />
      ))}
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

export const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className=" w-8 h-8 items-center justify-center flex hover:opacity-75 transition"
      onClick={() => onClick(color)}
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: colorRgbToHex(color) }}
      />
    </button>
  );
};
