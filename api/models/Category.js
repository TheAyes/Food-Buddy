import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
	name: String,
	image: String,
	products: [
		{
			type: mongoose.ObjectId,
			ref: "Product"
		}
	]
});

export const Category = mongoose.model("Category", CategorySchema);
