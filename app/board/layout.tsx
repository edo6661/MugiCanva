import { Metadata } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Drawing Chawn",
  description: "Drawing Mugi Chawn",
};

const DrawingLayout = ({ children }: Props) => {
  return children;
};

export default DrawingLayout;
