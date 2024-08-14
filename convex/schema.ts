import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  links: defineTable({
    // Alternative domain name. Empty string if you're just using a path-based match.
    domain: v.string(),
    // Target for the redirection. The "long" link.
    full: v.string(),
    // The path fragment after your short link domain. In `link.me/ab123`, it's `ab123`.
    // If you're matching on a domain name, put empty string.
    short: v.string(), 
  }).index("by_domain", ["domain", "short"]),
});
