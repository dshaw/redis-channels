# Redis Channels

Dirt simple Redis-based pubsub channels.

## ORLY

**That sounds tasty!**

I thought so too.

**Why?**

This began as research for a more involved Redis-based research. I wanted to explore the pure pubsub capabilities of Redis and how node_redis interacts with it.

**Why not just use node_redis?**

Go for it. Each subscriber requires a dedicated client, so I wanted a way to abstract out that requirement.

**Will the API change?**

Most likely. The heavy lifting is done by node_redis. It's the abstraction layer that's important here.