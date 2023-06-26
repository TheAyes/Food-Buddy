import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

const app = express();

app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.json());

app.get("*", (req, res) => {
	const filePath = path.join(__dirname, "../../dist/client/index.html");
	res.send(filePath);
});

app.listen(port, () => {
	console.info(`\x1b[32m%s\x1b[0m`, `API listening on ${port}`);
});
