import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],

	server: {
		// eslint-disable-next-line no-undef
		port: process.env.CLIENT_PORT ? Number(process.env.CLIENT_PORT) : 3000,
		host: "localhost",

		proxy: {
			"/api": {
				target: "http://localhost:4000",
				changeOrigin: true,
				secure: false
			}
		}
	},

	build: {
		outDir: "../dist/client",
		emptyOutDir: true
	}
});
