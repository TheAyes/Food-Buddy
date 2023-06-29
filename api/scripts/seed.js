import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

import { readFile, writeFile } from "fs/promises";

const groceries = JSON.parse(await readFile(new URL("../data/groceries.json", import.meta.url)));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apiKey = "44cd366d62264e0bb2d63b0151439b01";

const generateSeedData = async () => {
	/*const data = JSON.parse(await readFile(new URL("../data/grocery-data.json", import.meta.url)));*/
	const data = [];
	const ingredientList = await axios.get(`https://themealdb.com/api/json/v1/1/list.php?i=list`);

	for (let i = 0; i < ingredientList.data.meals.length; i++) {
		const priceInEuro = Math.floor(Math.random() * 100) + 0.99;

		const image = (
			await axios.get(
				`https://api.unsplash.com/search/photos?client_id=9FjmwmjNcrByx2Z1_2Muu6MVY-EBagEbddA1eNamrD4&orientation=squarish&query=raw-${encodeURIComponent(
					ingredientList.data.meals[i].strIngredient
				)}&page=1`
			)
		).data.results[0].urls.regular;

		console.log(image);

		data.push({
			name: ingredientList.data.meals[i].strIngredient,
			price: {
				value: priceInEuro,
				unit: "Euro"
			},
			image: image,
			category: ingredientList.data.meals[i].strType,
			rating: (Math.random() * 5).toFixed(1),
			numOfRatings: Math.floor(Math.random() * 1000)
		});
	}
	console.log(data);
	await writeFile("../data/grocery-data.json", JSON.stringify(data, null, 2));
	await new Promise((resolve) => setTimeout(resolve, 2000));
};

await generateSeedData();
