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
			product: {
				type: mongoose.ObjectId,
				ref: "Product"
			},
			quantity: Number
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
