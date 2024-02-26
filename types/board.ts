import { Id } from "@/convex/_generated/dataModel";

export interface Board {
  _id: string;
  title: string;
  userId: string;
  authorName: string;
  _creationTime: number;
  authorId: string;
  isFavorite: boolean;
  imageUrl: string;
}
export interface ResponseBoard {
  isFavorite: boolean;
  _id: Id<"boards">;
  _creationTime: number;
  title: string;
  orgId: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
}
