// Start Vite dev server with CI=true to prevent background stdin disconnect auto-shutdown
process.env.CI = 'true';
import('../node_modules/vite/bin/vite.js');
