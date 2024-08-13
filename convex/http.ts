import { httpRouter } from "convex/server";
import { endpoint } from "./shortener";

const http = httpRouter();

http.route({
  pathPrefix: "/",
  method: "GET",
  handler: endpoint,
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
