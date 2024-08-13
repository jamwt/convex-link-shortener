import { Doc } from "./_generated/dataModel";
import { DatabaseReader, httpAction, query } from "./_generated/server";
import { api } from "./_generated/api";

const LOCAL_DOMAINS = new Set();
LOCAL_DOMAINS.add("localhost");
LOCAL_DOMAINS.add("cvx.so");
LOCAL_DOMAINS.add("moonlit-human-810.convex.site");

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

export const endpoint = httpAction(async (ctx, request) => {
  const domain = request.headers.get("Host");
  const url = new URL(request.url);
  const path = url?.pathname;
  const parts = path?.split("/");
  const short = parts![1]; // First part is empty string -- since path starts with '/'

  const fullUrl = await ctx.runQuery(api.shortener.resolve, {
    short,
    domain: domain!,
  });

  if (typeof fullUrl !== "string") {
    return new Response("Short link not found", {
      status: 404,
    });
  }

  return new Response(null, {
    status: 302,
    headers: new Headers({
      location: fullUrl!,
    }),
  });
});
