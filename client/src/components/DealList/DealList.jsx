import { useEffect, useState } from "react";
import styles from "./DealList.module.scss";
import { DealItems } from "../DealItems/DealItems.jsx";
import axios from "axios";

export const DealList = ({ amount, offset = 0 }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get("/api/products");
				if (!data) return console.error("Error:", "Invalid Response!");
				setProducts(data.slice(offset, offset + amount)); // Nur die ersten 6 Produkte
			} catch (error) {
				console.error("Error:", error);
			}
		})();
	}, [amount, offset]);

	return (
		<div className={styles.DealList}>
			{products.map((item) => {
				return (
					<DealItems
						key={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
						rating={item.overallRating.toFixed(2)}
						id={item._id}
					/>
				);
			})}
		</div>
	);
};
