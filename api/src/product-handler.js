import { readFile } from "fs/promises";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

const categories = JSON.parse(await readFile("../data/grocery-categories.json", "utf-8"));

export const getProducts = async (req, res) => {
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

	res.json(await Product.find(filter).exec());
};

export const getProductById = async (req, res) => res.json(await Product.findById(req.params.id).exec());

export const getCategories = async (req, res) => res.json(await Category.find().populate("products").exec());

export const rateProduct = async (req, res) => {
	const foundProduct = await Product.findById({ id: req.params.id }).exec();

	foundProduct.ratings.push();
	await foundProduct.save();
	res.json(foundProduct);
};

export const wishlistProduct = async () => {};
