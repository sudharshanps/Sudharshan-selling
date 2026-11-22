import { createServer } from 'vite';

async function start() {
  const server = await createServer({
    configFile: './vite.config.ts',
    server: {
      port: 5173,
      host: true
    }
  });

  await server.listen();
  server.printUrls();
  console.log('🚀 Vite dev server running programmatically on port 5173');
}

start().catch((err) => {
  console.error('Failed to start Vite dev server:', err);
  process.exit(1);
});
