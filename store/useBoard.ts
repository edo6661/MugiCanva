import { ResponseBoard } from "@/types/board";
import { create } from "zustand";

interface BoardState {
  board: ResponseBoard[];
  setBoard: (board: ResponseBoard[]) => void;
}

export const useBoard = create<BoardState>((set) => ({
  board: [],
  setBoard: (board) => set({ board }),
}));
