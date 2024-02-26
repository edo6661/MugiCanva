import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const getBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity?.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();
      const ids = favoritedBoards.map((fav) => fav.boardId);
      // ! get all boards that are favorited using helpers cuz we dont have to write complex query
      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((board) => ({ ...board, isFavorite: true }));
    }

    const title = args.search as string;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          // ! search for title and orgId
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        // ! for faster query
        .withIndex("by_org", (q) =>
          // ! q.eq = query equal
          q.eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();
    }

    const boardsWithFavRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board_org", (q) =>
          q
            .eq("userId", identity.subject)
            .eq("boardId", board._id)
            .eq("orgId", board.orgId)
        )
        .unique()
        .then((fav) => {
          return {
            ...board,
            isFavorite: !!fav,
          };
        });
    });
    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavRelation);
    return boardsWithFavoriteBoolean;
  },
});

export const isFavorite = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const board = await ctx.db.get(args.id);
    if (!identity) throw new Error("Unauthorized");
    if (!board) throw new Error("Board not found");

    return await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q
          .eq("userId", identity.subject)
          .eq("boardId", board._id)
          .eq("orgId", board.orgId)
      )
      .unique();
  },
});
