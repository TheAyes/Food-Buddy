import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
import mongoose from "mongoose";
import {
	authenticateUser,
	getUserData,
	handleTokenRefresh,
	handleUserLogin,
	handleUserRegistration
} from "./auth-handler.js";
import {
	addCategory,
	addProduct,
	addProductToCart,
	getCategories,
	getCategoryById,
	getProductById,
	getProducts,
	rateProduct,
	wishlistProduct
} from "./product-handler.js";

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
 * @apiParam (Request body) {String} email The email of the new user.
 *
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/user/register", (req, res) => handleUserRegistration(req, res));

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
app.post("/api/user/login", (req, res) => handleUserLogin(req, res));

app.get("/api/user", authenticateUser, (req, res) => getUserData(req, res));

app.post("/api/user/refresh", (req, res) => handleTokenRefresh(req, res));

app.post("/api/products", (req, res) => addProduct(req, res));

/**
 * GET /api/products
 * @apiName GetAllProducts
 * @apiGroup Products
 *
 * @apiParam (Query Parameter) {string} category A category filter for your products.
 * @apiParam (Query Parameter) {string} nameFilter A name filter for your products.
 * @apiParam (Query Parameter) {string} minPrize The minimum prize products should have.
 * @apiParam (Query Parameter) {string} maxPrize The maximum prize products should have.
 * @apiParam (Query Parameter) {string} minRating The minimum rating products should have.
 * @apiParam (Query Parameter) {string} maxRating The maximum rating products should have.
 * @apiParam (Query Parameter) {string} minNumberOfRatings The minimum number of ratings products should have.
 * @apiParam (Query Parameter) {string} maxNumberOfRatings The maximum number of ratings products should have.
 *
 * @apiSuccess (Response body) {Array} products An array of products.
 */
app.get("/api/products", (req, res) => getProducts(req, res));

//("/api/products?category=meat&minPrize=40&maxPrize=80")

/**
 * GET /api/products/:id
 * @apiName GetProduct
 * @apiGroup Products
 *
 * @apiParam (URL Parameter) {String} id The id of the product.
 *
 * @apiSuccess (Response body) {Object} product The product object.
 */
app.get("/api/products/:id", (req, res) => getProductById(req, res));

app.post("/api/categories", (req, res) => addCategory(req, res));

/**
 * GET /api/categories
 * @apiName GetCategories
 * @apiGroup Categories
 *
 * @apiSuccess (Response body) {Array} categories An array of categories.
 */
app.get("/api/categories", (req, res) => getCategories(req, res));

app.get("/api/categories/:id", (req, res) => getCategoryById(req, res));

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
app.post("/api/products/:id/rate", authenticateUser, (req, res) => rateProduct(req, res));

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
app.post("/api/products/:id/wishlist", authenticateUser, (req, res) => wishlistProduct(req, res));

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
app.post("/api/products/:id/cart", authenticateUser, (req, res) => addProductToCart(req, res));

/**
 * GET /*
 * @apiName ServeClient
 * @apiGroup Client
 *
 * @apiSuccess (Response body) {String} path The path to the client application.
 */
app.get("*", (req, res) => res.send(path.join(__dirname, "../../dist/client/index.html")));

app.listen(port, () => console.info(`\x1b[32m%s\x1b[0m`, `API listening on ${port}`));
