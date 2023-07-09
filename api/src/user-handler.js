import { User } from "../models/User.js";

export const getUserData = async (req, res) => {
	const user = req.user;

	if (!user) return res.status(401).json({ error: "Unauthorized" });

	const updatedUser = await User.findById(req.user?._id).populate("cart.product");

	// Convert the mongoose document to a plain object
	let userObject = updatedUser.toObject();
	// Remove the password field
	delete userObject.password;

	return res.json({ user: userObject });
};

export const updateUserData = async (req, res) => {
	const userId = req.user?._id;

	if (!userId) return res.status(401).json({ error: "Unauthorized" });

	try {
		const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

		// Convert the mongoose document to a plain object
		let userObject = updatedUser.toObject();
		// Remove the password field
		delete userObject.password;

		return res.json({ user: userObject });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Failed to update user" });
	}
};
