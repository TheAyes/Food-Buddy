import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import groceryData from "../../data/grocery-data.json";
import styles from "./ItemList.module.scss";

export const ItemList = () => {
	const [products, setProducts] = useState([]);
	const [jsonData, setJsonData] = useState(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (groceryData) {
			const productsWithIds = groceryData.map((product) => ({
				...product,
				id: uuidv4()
			}));
			setSelectedItems(productsWithIds);
			setFilteredData(productsWithIds);
			setProducts(productsWithIds);
		}
	}, [jsonData]);

	const handleSelectItem = (item) => {
		const filteredItems = filteredData.filter((dataItem) =>
			dataItem.name.toLowerCase().includes(item.name.toLowerCase())
		);
		setFilteredData([...filteredItems, item]);
	};
	return (
		//hier das DIV nur als Übung für SearchBar
		<div>
			<SearchBar onSelectItem={handleSelectItem} />
			<div className={styles.ItemList}>
				{/* {products.map((product) => {
					return (
						<ProductItems
							key={product.id}
							image={product.image}
							name={product.name}
							price={product.price}
							rating={product.rating}
						/>
					);
				})} */}
				{filteredData.map((item) => (
					<ProductItems
						key={item.id}
						image={item.image}
						name={item.name}
						price={item.price}
						rating={item.rating}
					/>
				))}
			</div>
		</div>
	);
};

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

