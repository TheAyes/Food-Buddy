import axios from "axios";
import { markdownTable } from "markdown-table";
import { readFile, writeFile } from "fs/promises";

const fetchProducts = async () => {
	const res = await axios.get("http://localhost:4000/api/products");
	return res.data.map((product) => [product.name, product._id]);
};

const fetchCategories = async () => {
	const res = await axios.get("http://localhost:4000/api/categories");
	return res.data.map((category) => [category.name, category._id]);
};

const generateTable = (title, data) => {
	return `\n### ${title}\n\n` + markdownTable([["Name", "Id"], ...data]) + "\n";
};

const generateMarkdown = async () => {
	const products = await fetchProducts();
	const categories = await fetchCategories();

	const newContent =
		"\n<!-- ids:start -->" +
		generateTable("Categories", categories) +
		generateTable("Products", products) +
		"<!-- ids:end -->\n";

	const oldContent = await readFile("./../ReadMe.md", "utf-8");
	const updatedContent = oldContent.replace(/(<!-- ids:start -->)[\s\S]*(<!-- ids:end -->)/, newContent);

	await writeFile("./../ReadMe.md", updatedContent);
};

generateMarkdown();
