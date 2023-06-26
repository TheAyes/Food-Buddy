import express from "express";
import path from "path";

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

const app = express();

app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.json());

app.get("*", (req, res) => {
	const filePath = path.join(__dirname, "../../dist/client/index.html");
	res.send(filePath);
});

app.listen(port, () => {
	console.info(`API listening on ${port}`);
});
