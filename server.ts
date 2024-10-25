const port = 9055

Bun.serve({
  hostname: '0.0.0.0',
  port,
  fetch(request, server) {
    const url = new URL(request.url)

    console.log(`Request: ${request.url}`)
    if (url.pathname === '/') {
      return new Response('<html><body><h1>Hello World!</h1></body></html>', {
        headers: { 'Content-Type': 'text/html' },
      })
    }

    return new Response('Not Found', { status: 404 })
  },
})

console.log(`Server running at http://0.0.0.0:${port}`)
