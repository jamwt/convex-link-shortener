import { DatabaseReader, query } from "./_generated/server";

export const resolve = query(
  async (
    { db }: { db: DatabaseReader },
    { short }: { short: string }
  ): Promise<string | null> => {
    console.log(`Attempting to resolve short link: ${short}`);
    const doc = await db
      .query("links")
      .withIndex("by_short", (q) => q.eq("short", short))
      .unique();
    return doc?.full ?? null;
  }
);