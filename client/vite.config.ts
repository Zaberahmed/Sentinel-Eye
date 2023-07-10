import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite-pwa-org.netlify.app/guide/
export default defineConfig({
	plugins: [react(), VitePWA({ registerType: 'autoUpdate' })],
	server: {
		host: '0.0.0.0',
		port: 4321,
		strictPort: true,
	},
});
