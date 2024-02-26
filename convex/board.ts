import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { randomImages } from "../utils/index";
export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const generateRandomImages =
      randomImages[Math.floor(Math.random() * randomImages.length)];
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: args.imageUrl ? args.imageUrl : generateRandomImages,
    });
    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", args.id)
      )
      .unique();

    // ! dont have to give table name, it will be inferred from the query id
    if (existingFavorite) await ctx.db.delete(existingFavorite._id);
    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    // ! user cannot pass empty whitespace as characters
    const title = args.title.trim();
    if (!title) throw new Error("Title cannot be empty");
    if (title.length > 60)
      throw new Error("Title cannot be more than 60 characters");
    return ctx.db.patch(args.id, { title: args.title });
  },
});

export const toggleFavorite = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const board = await ctx.db.get(args.id);
    if (!identity) throw new Error("Unauthorized");
    if (!board) throw new Error("Board not found");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", board._id).eq("orgId", board.orgId)
      )
      .unique();

    if (existingFavorite) {
      return await ctx.db.delete(existingFavorite._id);
    }
    return await ctx.db.insert("userFavorites", {
      orgId: board.orgId,
      userId,
      boardId: board._id,
    });
  },
});

export const get = query({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
