import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    domain: v.optional(v.string()),
    full: v.string(),
    short: v.string(),
  })
    .index("by_short", ["short"])
    .index("by_domain", ["domain", "short"]),
});
