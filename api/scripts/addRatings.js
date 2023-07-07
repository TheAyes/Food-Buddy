import mongoose, { Types } from "mongoose";
import { Product } from "../models/Product.js";
import path, { dirname } from "path";
import { config } from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.join(__dirname, "/../../.env");

config({ path: envPath });

// Connect to the DB
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.DB_CLUSTER}.${process.env.DB_SHARD}.mongodb.net/?retryWrites=true&w=majority`;
await mongoose.connect(connectionString);

// Function to generate a random number of ratings for a product
function getRandomRatings() {
	const numRatings = Math.floor(Math.random() * 100); // Change max limit as required
	const ratings = [];

	for (let i = 0; i < numRatings; i++) {
		ratings.push({
			user: new Types.ObjectId(), // Creates new random ObjectId
			rating: Math.floor(Math.random() * 5) + 1 // Generates a rating between 1 and 5
		});
	}

	return ratings;
}

// Function to calculate the overall rating
function calculateOverallRating(ratings) {
	const sum = ratings.reduce((acc, curr) => acc + curr.rating, 0);
	return ratings.length ? sum / ratings.length : 0;
}

// Get all the products
const products = await Product.find({});

// Update the products with random ratings and overall rating
for (let product of products) {
	const ratings = getRandomRatings();
	const overallRating = calculateOverallRating(ratings);

	await Product.updateOne(
		{ _id: product._id },
		{
			$set: {
				ratings: ratings,
				overallRating: overallRating
			}
		}
	);
}
