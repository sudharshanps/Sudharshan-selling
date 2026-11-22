// Set CI to true BEFORE importing Vite to prevent Vite from binding stdin "end" to SIGTERM
process.env.CI = 'true';

const { createServer } = await import('vite');

async function start() {
  // Keep event loop permanently active
  setInterval(() => {}, 60000);

  // Prevent stdin disconnect from triggering exit
  if (process.stdin && process.stdin.removeAllListeners) {
    process.stdin.removeAllListeners('end');
    try {
      process.stdin.resume();
    } catch (e) {}
  }

  const server = await createServer({
    configFile: './vite.config.ts',
    server: {
      port: 5173,
      host: true
    }
  });

  await server.listen();

  // Ensure no stdin end listeners persist
  if (process.stdin && process.stdin.removeAllListeners) {
    process.stdin.removeAllListeners('end');
  }

  server.printUrls();
  console.log('🚀 SUDHARSHAN_TECH Vite dev server running stably on port 5173');
}

start().catch((err) => {
  console.error('Failed to start Vite dev server:', err);
  process.exit(1);
});
