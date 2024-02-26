import { colorRgbToHex } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface RectangleProps {
  layerId: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  layer: RectangleLayer;
  selectionColor?: string;
}
const Rectangle = ({
  layer,
  layerId,
  onLayerPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className=" drop-shadow-md"
      onPointerDown={(e) => onLayerPointerDown(e, layerId)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorRgbToHex(fill) : "#000000"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Rectangle;
