import React, { useEffect, useState } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import styles from "./ItemList.module.scss";

export const ItemList = () => {
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		// Selbst ausführende Funktion
		(async () => {
			try {
				const response = await fetch("/api/products"); // Endpunkt anpassen
				const data = await response.json();
				setFilteredData(data);
			} catch (error) {
				console.error("Error:", error);
			}
		})(); // <-- Siehe funktionsklammern
	}, []);

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
				{filteredData.map((item, index) => (
					<ProductItems
						key={index}
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
