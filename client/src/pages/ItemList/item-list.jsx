import React, { useState, useEffect } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import groceryData from "../../data/grocery-data.json";
import { v4 as uuidv4 } from "uuid";
import styles from "./ItemList.module.scss";

export const ItemList = () => {
	const [products, setProducts] = useState([]);
	const [jsonData, setJsonData] = useState(null);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			const response = await fetch(groceryData);
	// 			const jsonData = await response.json();
	// 			setData(jsonData);
	// 		} catch (error) {
	// 			console.error("Error:", error);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);

	useEffect(() => {
		if (groceryData) {
			const productsWithIds = groceryData.map((product) => ({
				...product,
				id: uuidv4()
			}));
			setProducts(productsWithIds);
		}
	}, [jsonData]);

	return (
		<div className={styles.ItemList}>
			{products.map((product) => {
				return (
					<ProductItems
						key={product.id}
						image={product.image}
						name={product.name}
						price={product.price}
						rating={product.rating}
					/>
				);
			})}
		</div>
	);
};

