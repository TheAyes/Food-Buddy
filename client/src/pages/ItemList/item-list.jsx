import React, { useEffect, useState } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import styles from "./ItemList.module.scss";
import axios from "axios";

export const ItemList = ({
	category = "",
	nameFilter = "",
	minPrize = undefined,
	maxPrize = undefined,
	minRating = undefined,
	maxRating = undefined,
	minNumberOfRatings = "undefined",
	maxNumberOfRatings = "undefined"
}) => {
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		const params = new URLSearchParams();

		// Append parameters if they exist
		if (category) params.append("category", category);
		if (nameFilter) params.append("nameFilter", nameFilter);
		if (minPrize) params.append("minPrize", minPrize);
		if (maxPrize) params.append("maxPrize", maxPrize);
		if (minRating) params.append("minRating", minRating);
		if (maxRating) params.append("maxRating", maxRating);
		if (minNumberOfRatings) params.append("minNumberOfRatings", minNumberOfRatings);
		if (maxNumberOfRatings) params.append("maxNumberOfRatings", maxNumberOfRatings);

		// Selbst ausführende Funktion
		(async () => {
			try {
				const { data } = await axios.get(`/api/products?${params}`);
				setFilteredData(data);
			} catch (error) {
				console.error("Error:", error);
			}
		})(); // <-- Siehe funktionsklammern
	}, [category, nameFilter, minPrize, maxPrize, minRating, maxRating, minNumberOfRatings, maxNumberOfRatings]);

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
