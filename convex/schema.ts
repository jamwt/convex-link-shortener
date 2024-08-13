import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    domain: v.string(),
    full: v.string(),
    short: v.string(),
  }).index("by_domain", ["domain", "short"]),
});
