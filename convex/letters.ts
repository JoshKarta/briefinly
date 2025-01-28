import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createLetter = mutation({
  args: {
    title: v.string(),
    text: v.string(),
    user_id: v.string(),
    user_email: v.string(),
    confetti: v.boolean(),
    confetti_type: v.string(),
    confetti_emoji: v.string(),
    letter_id: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("letters", {
      title: args.title,
      text: args.text,
      user_id: args.user_id,
      confetti: args.confetti,
      confetti_type: args.confetti_type,
      confetti_emoji: args.confetti_emoji,
      letter_id: args.letter_id,
      user_email: args.user_email,
    });
  },
});

export const getLetters = query({
  args: { user_id: v.string() },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query("letters")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();
  },
});

export const getLettterById = query({
  args: { letter_id: v.string() },
  handler: async (ctx, { letter_id }) => {
    return await ctx.db
      .query("letters")
      .filter((q) => q.eq(q.field("letter_id"), letter_id))
      .collect();
  },
});
