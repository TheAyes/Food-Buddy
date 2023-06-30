import React, { useState, useEffect } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import groceryData from "../../data/grocery-data.json";
import styles from "./ItemList.module.scss";

export const ItemList = () => {
	const [products, setProducts] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch("api/products"); // Endpunkt anpassen
			const data = await response.json();
			setProducts(data);
			setFilteredData(data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

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
				{filteredData.map((item) => (
					<ProductItems
						key={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
						rating={item.ratings}
					/>
				))}
			</div>
		</div>
	);
};

