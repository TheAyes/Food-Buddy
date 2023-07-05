import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import * as process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Customize path to .env
const envPath = path.join(__dirname, "/../.env");

config({ path: envPath });
export default defineConfig({
	plugins: [react()],

	server: {
		// eslint-disable-next-line no-undef
		port: process.env.CLIENT_PORT ? Number(process.env.CLIENT_PORT) : 3000,
		host: "localhost",

		proxy: {
			"/api": {
				target: `http://localhost:${process.env.API_PORT ?? 4000}`,
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
