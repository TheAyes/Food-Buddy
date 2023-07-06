export const updateUserData = async (req, res) => {
	try {
		const updatedData = req.body;
		req.user.set(updatedData); // set the updated fields on the Mongoose document
		await req.user.save(); // save the updated document to the database
		const result = { ...req.user.toObject(), password: undefined }; // convert to a plain object and remove the password field
		res.json(result);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
