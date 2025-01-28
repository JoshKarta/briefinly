import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  letters: defineTable({
    title: v.string(),
    text: v.string(),
    user_id: v.string(),
    user_email: v.string(),
    confetti: v.boolean(),
    confetti_type: v.string(),
    confetti_emoji: v.string(),
    letter_id: v.string(),
  }),
  test: defineTable({
    text: v.string(),
  }),
});
