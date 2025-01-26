import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createTest = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("test", { text: args.text });
    return newTaskId;
  },
});
