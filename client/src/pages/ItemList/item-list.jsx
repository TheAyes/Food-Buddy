import React, { useState, useEffect } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { data } from "../../data/data.json";

export const ItemList = () => {
	const [products, setProducts] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(data);
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error("Error:", error);
			}
		};
		fetchData();
	}, []);

	return <></>;
};

