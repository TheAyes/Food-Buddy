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
 * POST /api/user/register
 * @apiName RegisterUser
 * @apiGroup Users
 * @apiParam (Request body) {String} username The username of the new user.
 * @apiParam (Request body) {String} password The password of the new user.
 * @apiParam (Request body) {String} email The email of the new user.
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/user/register", (req, res) => handleUserRegistration(req, res));

/**
 * POST /api/user/login
 * @apiName LoginUser
 * @apiGroup Users
 * @apiParam (Request body) {String} username The username of the user.
 * @apiParam (Request body) {String} password The password of the user.
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/user/login", (req, res) => handleUserLogin(req, res));

/**
 * GET /api/user
 * @apiName GetUser
 * @apiGroup Users
 * @apiSuccess (Response body) {Object} user The authenticated user's data.
 */
app.get("/api/user", authenticateUser, (req, res) => getUserData(req, res));

/**
 * POST /api/user/refresh
 * @apiName RefreshToken
 * @apiGroup Users
 * @apiSuccess (Response body) {String} token New token for the user.
 */
app.post("/api/user/refresh", (req, res) => handleTokenRefresh(req, res));

/**
 * POST /api/products
 * @apiName AddProduct
 * @apiGroup Products
 * @apiParam (Request body) {Object} product The product details.
 * @apiSuccess (Response body) {Object} product The newly added product data.
 */
app.post("/api/products", (req, res) => addProduct(req, res));

/**
 * GET /api/products
 * @apiName GetProducts
 * @apiGroup Products
 * @apiSuccess (Response body) {Array} products The list of products.
 */
app.get("/api/products", (req, res) => getProducts(req, res));

/**
 * GET /api/products/:id
 * @apiName GetProductById
 * @apiGroup Products
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiSuccess (Response body) {Object} product The product object.
 */
app.get("/api/products/:id", (req, res) => getProductById(req, res));

/**
 * POST /api/categories
 * @apiName AddCategory
 * @apiGroup Categories
 * @apiParam (Request body) {Object} category The category details.
 * @apiSuccess (Response body) {Object} category The newly added category data.
 */
app.post("/api/categories", (req, res) => addCategory(req, res));

/**
 * GET /api/categories
 * @apiName GetCategories
 * @apiGroup Categories
 * @apiSuccess (Response body) {Array} categories The list of categories.
 */
app.get("/api/categories", (req, res) => getCategories(req, res));

/**
 * GET /api/categories/:id
 * @apiName GetCategoryById
 * @apiGroup Categories
 * @apiParam (URL Parameter) {String} id The id of the category.
 * @apiSuccess (Response body) {Object} category The category object.
 */
app.get("/api/categories/:id", (req, res) => getCategoryById(req, res));

/**
 * POST /api/products/:id/rate
 * @apiName RateProduct
 * @apiGroup Products
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Request body) {Number} rating The rating given by the user.
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/products/:id/rate", (req, res) => rateProduct(req, res));

/**
 * POST /api/products/:id/wishlist
 * @apiName UpdateWishlist
 * @apiGroup Products
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Query Parameter) {Boolean} add Whether to add (true) or remove (false) the product from the wishlist. Default is true.
 * @apiSuccess (Response body) {String} message Confirmation message.
 */
app.post("/api/products/:id/wishlist", authenticateUser, (req, res) => wishlistProduct(req, res));

/**
 * POST /api/products/:id/cart
 * @apiName UpdateCart
 * @apiGroup Products
 * @apiParam (URL Parameter) {String} id The id of the product.
 * @apiParam (Query Parameter) {Boolean} add Whether to add (true) or remove (false) the product from the shopping cart. Default is true.
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
