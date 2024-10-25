# About Me

I'm a motivated self-started with over two decades of combined experience in a wealth of technologies. For more info why not [check my portfolio out live](https://strutcode.dev)?

# About This Project

This portfolio represents a collection of a few of my favorite technologies that I felt suit the purpose well. Below is a short list with explanation of my reasoning for each.

**Bun**
For raw speed. This project runs on a minimal server and resource consumption is important to me here. Practical benchmarks revealed that for the simple HTTP server use case here Bun is simply faster.

**TypeScript**
A given. If I'm going to work in a browser ecosystem TypeScript is my language of choice to transpile into JavaScript. The minimal deviation from existing JavaScript APIs combined with the practical if not slightly limited type safety and error checking features make it a no-brainer.

**Vite**
One of my favorite tools as a low configuration and feature-rich layer on top of the fabulous `esbuild` core. It makes setup painless and lets me focus on rapid development.

**Vue**
Hands down the best reactive frontend framework out there. I find it to be the best compromise between the openness and inefficiency of React versus the raw speed but rigidity of something like Svelte.

# Deployment Strategy

The eagle-eyed reviewer would notice that the web server is running insecurely over http; that's because in production it will be running behind a pre-configured reverse-proxy server with authenticate certificates.
