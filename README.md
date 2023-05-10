# Convex Link Shortener

Very simple project which uses a convex deployment with a `links` table to resolve short links to full URLs, and redirects accordingly.

## Caveat: H4x

When Convex supports virtual hosting other domains to its `.site` http actions, this whole project should be simplified just as an http action! This current implementation which loads an entire React app just to perform redirections is
pretty ridiculous in its current form, and doesn't work correctly with e.g. curl.