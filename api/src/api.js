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
	handleUserLogout,
	handleUserRegistration
} from "./auth-handler.js";
import {
	addCategory,
	addProduct,
	addProductToCart,
	deleteProductById,
	getCategories,
	getCategoryById,
	getProductById,
	getProductDeals,
	getProducts,
	rateProduct,
	updateDeals,
	updateProductById,
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

app.use(express.static(path.join(__dirname, "../../dist/client")));
app.use(express.json());

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_CLUSTER}.${process.env.DB_SHARD}.mongodb.net/?retryWrites=true&w=majority`;

try {
	await mongoose.connect(connectionString);
} catch (error) {
	console.error(`Failed to connect to database with string: ${connectionString}`, error);
	process.exit(1);
}

const endpointsBuilder = [
	{
		method: "POST",
		path: "/api/user/register",
		urlParams: [],
		queryParams: [],
		headStructure: {},
		bodyStructure: { username: "string", password: "string", email: "string" },
		middlewares: [],
		function: (req, res) => handleUserRegistration(req, res)
	},
	{
		method: "POST",
		path: "/api/user/login",
		urlParams: [],
		queryParams: [],
		headStructure: {},
		bodyStructure: { username: "string", password: "string" },
		middlewares: [],
		function: (req, res) => handleUserLogin(req, res)
	},
	{
		method: "POST",
		path: "/api/user/logout",
		urlParams: [],
		queryParams: [],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: {
			accessToken: "string",
			refreshToken: "string"
		},
		middlewares: [],
		function: (req, res) => handleUserLogout(req, res)
	},
	{
		method: "GET",
		path: "/api/user",
		urlParams: [],
		queryParams: [],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: {},
		middlewares: [authenticateUser],
		function: (req, res) => getUserData(req, res)
	},
	{
		method: "POST",
		path: "/api/user/refresh",
		urlParams: [],
		queryParams: [],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: {},
		middlewares: [],
		function: (req, res) => handleTokenRefresh(req, res)
	},
	{
		method: "POST",
		path: "/api/products",
		urlParams: [],
		queryParams: [],
		bodyStructure: {
			product: {
				name: "string",
				image: "string",
				price: {
					value: "number",
					unit: "string",
					priceReduction: "number"
				},
				categories: ["id for category"],
				ratings: [{ user: "userID:string", rating: "number" }]
			}
		},
		middlewares: [],
		function: async (req, res) => addProduct(req, res)
	},
	{
		method: "GET",
		path: "/api/products",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => getProducts(req, res)
	},
	{
		method: "GET",
		path: "/api/products/deals",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => getProductDeals(req, res)
	},
	{
		method: "DELETE",
		path: "/api/products/:id",
		urlParams: [{ id: "string" }],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => deleteProductById(req, res)
	},
	{
		method: "PATCH",
		path: "/api/products/:id",
		urlParams: ["id"],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => updateProductById(req, res)
	},
	{
		method: "GET",
		path: "/api/products/:id",
		urlParams: ["id"],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => getProductById(req, res)
	},
	{
		method: "PATCH",
		path: "/api/products/deals/update",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => updateDeals(req, res)
	},
	{
		method: "POST",
		path: "/api/categories",
		urlParams: [],
		queryParams: [],
		bodyStructure: { category: {} },
		middlewares: [],
		function: async (req, res) => addCategory(req, res)
	},
	{
		method: "GET",
		path: "/api/categories",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => getCategories(req, res)
	},
	{
		method: "GET",
		path: "/api/categories/:id",
		urlParams: ["id"],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => getCategoryById(req, res)
	},
	{
		method: "POST",
		path: "/api/products/:id/rate",
		urlParams: ["id"],
		queryParams: [],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: { rating: 0 },
		middlewares: [authenticateUser],
		function: async (req, res) => rateProduct(req, res)
	},
	{
		method: "POST",
		path: "/api/products/:id/wishlist",
		urlParams: ["id"],
		queryParams: ["add"],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: {},
		middlewares: [authenticateUser],
		function: async (req, res) => wishlistProduct(req, res)
	},
	{
		method: "POST",
		path: "/api/products/:id/cart",
		urlParams: ["id"],
		queryParams: ["add"],
		headStructure: {
			Authorization: `Bearer JWT_TOKEN_HERE`
		},
		bodyStructure: {},
		middlewares: [authenticateUser],
		function: async (req, res) => addProductToCart(req, res)
	},
	{
		method: "GET",
		path: "/api/docs",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => res.json(endpointsBuilder)
	},
	{
		method: "GET",
		path: "*",
		urlParams: [],
		queryParams: [],
		bodyStructure: {},
		middlewares: [],
		function: async (req, res) => {
			res.sendFile(path.join(__dirname, "../../dist/client/index.html"));
		}
	}
];

endpointsBuilder.forEach((endpoint) => {
	app[endpoint.method.toLowerCase()](endpoint.path, endpoint.middlewares, endpoint.function);
});

app.listen(port, () => console.info(`\x1b[32m%s\x1b[0m`, `API listening on ${port}`));
