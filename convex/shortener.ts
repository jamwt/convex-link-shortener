import { Doc } from "./_generated/dataModel";
import { DatabaseReader, query } from "./_generated/server";

const LOCAL_DOMAINS = new Set();
LOCAL_DOMAINS.add("localhost");
LOCAL_DOMAINS.add("cvx.so");

export const resolve = query(
  async (
    { db }: { db: DatabaseReader },
    { short, domain }: { short: string; domain: string }
  ): Promise<string | null> => {
    console.log(`Called with ${domain} and ${short}`);
    let doc: Doc<"links"> | null = null;
    if (LOCAL_DOMAINS.has(domain)) {
      console.log(`Attempting to resolve local short link: ${short}`);
      doc = await db
        .query("links")
        .withIndex("by_short", (q) => q.eq("short", short))
        .unique();
    } else {
      console.log(`Attempting domain redirect ${domain} ${short}`);
      doc = await db
        .query("links")
        .withIndex("by_domain", (q) =>
          q.eq("domain", domain).eq("short", short)
        )
        .unique();
    }
    return doc?.full ?? null;
  }
);
