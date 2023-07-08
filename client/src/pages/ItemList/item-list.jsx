import { useEffect, useState } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import styles from "./ItemList.module.scss";
import axios from "axios";
import PropTypes from "prop-types";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx";

export const ItemList = ({
	category = "",
	nameFilter = "",
	minPrize = undefined,
	maxPrize = undefined,
	minRating = undefined,
	maxRating = undefined,
	minNumberOfRatings = "undefined",
	maxNumberOfRatings = "undefined",
	amount = -1,
	offset = 0
}) => {
	ItemList.propTypes = {
		category: PropTypes.string,
		nameFilter: PropTypes.string,
		minPrize: PropTypes.number,
		maxPrize: PropTypes.number,
		minRating: PropTypes.number,
		maxRating: PropTypes.number,
		minNumberOfRatings: PropTypes.string,
		maxNumberOfRatings: PropTypes.string,
		amount: PropTypes.number,
		offset: PropTypes.number
	};
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

		(async () => {
			try {
				const { data } = await axios.get(`/api/products?${params}`);

				setFilteredData(amount > -1 ? data.slice(offset, offset + amount) : data);
			} catch (error) {
				console.error("Error:", error);
			}
		})(); // <-- Siehe funktionsklammern
	}, [
		category,
		nameFilter,
		minPrize,
		maxPrize,
		minRating,
		maxRating,
		minNumberOfRatings,
		maxNumberOfRatings,
		offset,
		amount
	]);

	const handleSelectItem = (item) => {
		const filteredItems = filteredData.filter((dataItem) =>
			dataItem.name.toLowerCase().includes(item.name.toLowerCase())
		);
		setFilteredData([...filteredItems, item]);
	};

	return (
		<div className={styles.parentContainer}>
			<div className={styles.headContainer}>
				<GoBackButton />
				<article className={styles.searchBar}>
					<SearchBar onSelectItem={handleSelectItem} />
				</article>
			</div>
			<div className={styles.ItemList}>
				{filteredData.map((item) => (
					<ProductItems
						key={item._id}
						_id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
						rating={item.rating}
					/>
				))}
			</div>
			<NavBar />
		</div>
	);
};

ItemList.defaultProps = {
	category: "",
	nameFilter: "",
	minPrize: undefined,
	maxPrize: undefined,
	minRating: undefined,
	maxRating: undefined,
	minNumberOfRatings: "undefined",
	maxNumberOfRatings: "undefined"
};

