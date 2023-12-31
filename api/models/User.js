import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
	username: String,
	fullName: String,

	email: String,
	phoneNumber: String,

	address: {
		street: String,
		streetNumber: String,
		zipCode: String,
		city: String,
		country: String
	},

	password: String,
	wishlist: [
		{
			type: mongoose.ObjectId,
			ref: "Product"
		}
	],
	cart: [
		{
			type: mongoose.ObjectId,
			ref: "Product"
		}
	],
	ratings: [
		{
			product: {
				type: mongoose.ObjectId,
				ref: "Product"
			},
			rating: Number,
			created: String
		}
	]
});

export const User = mongoose.model("User", UserSchema);
