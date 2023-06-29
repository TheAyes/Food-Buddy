import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
	name: String,
	image: String,
	price: {
		value: Number,
		unit: String,
		priceReduction: Number
	},
	categories: [{ type: mongoose.ObjectId, ref: "Category" }],
	overallRating: {
		required: false,
		type: Number
	},
	ratings: [
		{
			user: { type: mongoose.ObjectId, ref: "User" },
			rating: Number
		}
	]
});

export const Product = mongoose.model("Product", ProductSchema);
