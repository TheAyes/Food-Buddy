import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export const addProduct = async (req, res) => {
	try {
		const newProduct = new Product(req.body);

		for (const item of newProduct.categories) {
			const foundCategory = await Category.findById(item).exec();
			if (foundCategory) {
				foundCategory.products.push(newProduct._id);
				await foundCategory.save();
			}
		}

		await newProduct.save();

		res.json(newProduct);
	} catch (error) {
		res.status(500).json({ message: "An error occurred", error });
	}
};

export const getProducts = async (req, res) => {
	try {
		const category = req.query.category;
		const nameFilter = req.query.name;
		const minPrize = req.query.minPrize ? Number(req.query.minPrize) : undefined;
		const maxPrize = req.query.maxPrize ? Number(req.query.maxPrize) : undefined;
		const minRating = req.query.minRating ? Number(req.query.minRating) : undefined;
		const maxRating = req.query.maxRating ? Number(req.query.maxRating) : undefined;
		const minNumberOfRatings = req.query.minNumberOfRatings ? Number(req.query.minNumberOfRatings) : undefined;
		const maxNumberOfRatings = req.query.maxNumberOfRatings ? Number(req.query.maxNumberOfRatings) : undefined;

		let filter = {};
		let productIds = [];

		if (category) {
			const category = await Category.findOne({ name: category }).populate("products");
			if (!category) {
				return res.status(404).json({ message: "Category not found" });
			}
			productIds = category.products;
			filter._id = { $in: productIds }; // only include products in the specified category
		}

		if (nameFilter) filter.name = { $regex: nameFilter, $options: "i" }; // case-insensitive match

		if (minPrize || maxPrize) filter["price.value"] = {};
		if (minPrize) filter["price.value"].$gte = minPrize; // greater than or equal to
		if (maxPrize) filter["price.value"].$lte = maxPrize; // less than or equal to

		if (minRating || maxRating) filter.overallRating = {};
		if (minRating) filter.overallRating.$gte = minRating;
		if (maxRating) filter.overallRating.$lte = maxRating;

		if (minNumberOfRatings || maxNumberOfRatings) filter["ratings.length"] = {};
		if (minNumberOfRatings) filter["ratings.length"].$gte = minNumberOfRatings;
		if (maxNumberOfRatings) filter["ratings.length"].$lte = maxNumberOfRatings;

		res.json(await Product.find(filter).populate("categories").populate("ratings.user").exec());
	} catch (error) {
		res.status(500).json(error);
	}
};

export const deleteProductById = async (req, res) => {
	try {
		const result = Product.findById(req.params.id);
		if (!result) res.status(404).json({ message: "Not found" });

		await result.deleteOne();

		res.json({ message: `Deleted Product with ID: ${req.params.id}` });
	} catch (error) {
		res.status(500).json(error);
	}
};

export const updateProductById = async (req, res) => {
	try {
		const result = Product.findById(req.params.id);
		if (!result) return res.status(404).json({ message: "Not found" });

		const updatedProduct = {
			...result,
			...req.body
		};
		res.json(updatedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getProductById = async (req, res) => {
	try {
		res.json(await Product.findById(req.params.id).exec());
	} catch (error) {
		res.status(500).json(error);
	}
};

export const addCategory = async (req, res) => {
	try {
		const newCategory = new Category(req.body);
		await newCategory.save();
		res.json(newCategory);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getCategories = async (req, res) => {
	try {
		res.json(await Category.find().populate("products").exec());
	} catch (error) {
		res.status(500).json(error);
	}
};

export const getCategoryById = (req, res) => {
	try {
		const result = Category.findById(req.params.id);
		res.json(result);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const rateProduct = async (req, res) => {
	try {
		const foundProduct = await Product.findById(req.params.id);

		const newRating = {
			user: req.user.id,
			rating: req.query.value,
			created: new Date().toISOString()
		};

		foundProduct.ratings.push(newRating);

		// Recalculate the overall rating
		if (foundProduct.ratings.length > 0) {
			foundProduct.overallRating =
				foundProduct.ratings.reduce((a, b) => a + b.rating, 0) / foundProduct.ratings.length;
		} else {
			foundProduct.overallRating = 0;
		}

		await foundProduct.save();
		res.json(foundProduct);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const wishlistProduct = async (req, res) => {
	try {
		const user = req.user;
		const product = await Product.findById(req.params.id).exec();

		if (!user || !product) {
			res.status(404).json({ message: "user or product not found." });
		}

		user.wishlist.push(product.id);
	} catch (error) {
		res.status(500).json(error);
	}
};

export const addProductToCart = async (req, res) => {
	try {
		const user = req.user;
		const product = await Product.findById(req.params.id).exec();

		if (!user || !product) {
			res.status(404).json({ message: "user or product not found." });
		}

		user.cart.push(product.id);
	} catch (error) {
		res.status(500).json(error);
	}
};
