import { useEffect, useState } from "react";
import { ProductItems } from "../../components/ProductItems/ProductItems.jsx";
import { SearchBar } from "../../components/SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import styles from "./ItemList.module.scss";
import PropTypes from "prop-types";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import axios from "axios";

export const ItemList = ({
	category = "",
	nameFilter = "",
	minPrize = undefined,
	maxPrize = undefined,
	minRating = undefined,
	maxRating = undefined,
	minNumberOfRatings = undefined,
	maxNumberOfRatings = undefined,
	amount = -1,
	offset = 0
}) => {
	const [filteredData, setFilteredData] = useState([]);
	const location = useLocation();

	const handleSelectItem = (item, paramData) => {
		const params = new URLSearchParams(location.search);
		let searchTerm = item || {};
		let data = filteredData.length <= 0 ? paramData : filteredData;
		if (params.get("searchTerm") !== null) {
			console.log(params);
			searchTerm.name = params.get("searchTerm");
		}
		const filteredItems = data.filter((dataItem) =>
			dataItem.name.toLowerCase().includes(searchTerm.name.toLowerCase())
		);
		setFilteredData([...filteredItems]);
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);

		console.log(params.get("searchTerm"));
		const categoryParam = params.get("category");
		const nameFilterParam = params.get("nameFilter");
		const minPrizeParam = params.get("minPrize");
		const maxPrizeParam = params.get("maxPrize");

		const newCategory = categoryParam || category;
		const newNameFilter = nameFilterParam || nameFilter;
		const newMinPrize = minPrizeParam ? parseInt(minPrizeParam) : minPrize;
		const newMaxPrize = maxPrizeParam ? parseInt(maxPrizeParam) : maxPrize;

		// Append parameters if they exist
		if (newCategory) params.set("category", newCategory);
		if (newNameFilter) params.set("nameFilter", newNameFilter);
		if (newMinPrize) params.set("minPrize", newMinPrize);
		if (newMaxPrize) params.set("maxPrize", newMaxPrize);

		(async () => {
			try {
				const { data } = await axios.get(`/api/products?${params}`);

				setFilteredData(amount > -1 ? data.slice(offset, offset + amount) : data);
				if (params.get("searchTerm") !== null) {
					handleSelectItem(undefined, amount > -1 ? data.slice(offset, offset + amount) : data);
				}
			} catch (error) {
				console.error("Error:", error);
			}
		})();
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
		amount,
		location.search
	]);

	return (
		<div className={styles.parentContainer}>
			<div className={styles.headContainer}>
				<GoBackButton />
				<article className={styles.searchBar}>
					<SearchBar onSelectItem={handleSelectItem} />
				</article>
			</div>
			<div className={styles.ItemList}>
				{filteredData.map((item, index) => (
					<ProductItems
						key={index}
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

