# Convex Link Shortener

Very simple project that uses a convex deployment with a `links` table to resolve
short links to full URLs and redirects accordingly.

It also supports redirecting domains to some other place.

Convex, inc. uses this project for links like:

 * cvx.so/fireship -> UTM Link for fireship campaign
 * dryad.gg -> Redirection to the dryad project on convex.dev

But you can use it for whatever you want!

# Deploying

Just deploy this like any other project.

Then, you have two ways to serve redirects from your custom short-link domain:

## The okay way

Deploy the react app to Vercel/Netlify and then set up a domain alias for your project
there. This will mean the browser has to load an entire little react app just to redirect
the page via browser APIs (after getting the redirect URL over a WebSocket from the
Convex deployment.) This works but is slow and h4x.

## The better way

If you're a Convex Pro customer, use Convex's Custom Domain feature to alias your
short link domain to your `.site` of your production deployment. An HTTP action
is registered to handle all requests there, and it will issue a 302 redirect as
appropriate without loading a React app.

# Adding Links

Just use the Convex dashboard, you silly goose.

# Editing Links

Just use the Convex dashboard, you little scamp.

# Deleting Links

Just use the Convex dashboard, you cheeky monkey.
