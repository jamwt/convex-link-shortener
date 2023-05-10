import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({ full: v.string(), short: v.string() })
  .index("by_short", ["short"])
  ,
});
