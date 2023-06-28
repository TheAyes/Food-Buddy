import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.join(__dirname, "/../../.env");

config({ path: envPath });

const port = process.env.API_PORT ? Number(process.env.API_PORT) : 4000;

const preFlightConditions = [
	port,
	process.env.DB_USER,
	process.env.DB_USER,
	process.env.DB_PW,
	process.env.DB_CLUSTER,
	process.env.DB_SHARD
];

if (!preFlightConditions.some((item) => item)) process.exit(1);

const app = express();

app.use(express.static(path.join(__dirname, "../../client")));
app.use(express.json());

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_CLUSTER}.${process.env.DB_SHARD}.mongodb.net/?retryWrites=true&w=majority`;

try {
	await mongoose.connect(connectionString);
} catch (error) {
	console.error(`Failed to connect to database with string: ${connectionString}`, error);
	process.exit(1);
}

/**
 * POST /api/users/register
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam (Request body) {String} username The username of the new user.
 * @apiParam (Request body) {String} password The password of the new user.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/users/register", (req, res) => res.send("Yup!"));

/**
 * POST /api/users/login
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam (Request body) {String} username The username of the user.
 * @apiParam (Request body) {String} password The password of the user.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/users/login", (req, res) => res.send("Yup!"));

/**
 * GET /api/products
 * @apiName GetAllProducts
 * @apiGroup Products
 *
 * @apiSuccess (Response body) {Array} products An array of products.
 */
app.get("/api/products", (req, res) => res.send("Yup!"));

/**
 * GET /api/products/:id
 * @apiName GetProduct
 * @apiGroup Products
 *
 * @apiParam (URL Parameter) {String} id The id of the product.
 *
 * @apiSuccess (Response body) {Object} product The product object.
 */
app.get("/api/products/:id", (req, res) => res.send("Yup!"));

/**
 * GET /api/categories
 * @apiName GetCategories
 * @apiGroup Categories
 *
 * @apiSuccess (Response body) {Array} categories An array of categories.
 */
app.get("/api/categories", (req, res) => res.send("Yup!"));

/**
 * GET /api/categories/:category/products
 * @apiName GetCategoryProducts
 * @apiGroup Categories
 *
 * @apiParam (URL Parameter) {String} category The category of the products.
 *
 * @apiSuccess (Response body) {Array} products An array of products within the category.
 */
app.get("/api/categories/:category/products", (req, res) => res.send("Yup!"));

/**
 * POST /api/products/:id/rate
 * @apiName RateProduct
 * @apiGroup Products
 *
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Query Parameter) {Number} value The rating value between 0.0 to 5.0.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/products/:id/rate", (req, res) => res.send("Yup!"));

/**
 * POST /api/products/:id/wishlist
 * @apiName UpdateWishlist
 * @apiGroup Products
 *
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Query Parameter) {Boolean} add Whether to add (true) or remove (false) the product from the wishlist. Default is true.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/products/:id/wishlist", (req, res) => res.send("Yup!"));

/**
 * POST /api/products/:id/cart
 * @apiName UpdateCart
 * @apiGroup Products
 *
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Query Parameter) {Boolean} add Whether to add (true) or remove (false) the product from the shopping cart. Default is true.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/products/:id/cart", (req, res) => res.send("Yup!"));

/**
 * GET /*
 * @apiName ServeClient
 * @apiGroup Client
 *
 * @apiSuccess (Response body) {String} path The path to the client application.
 */
app.get("*", (req, res) => res.send(path.join(__dirname, "../../dist/client/index.html")));

app.listen(port, () => console.info(`\x1b[32m%s\x1b[0m`, `API listening on ${port}`));
