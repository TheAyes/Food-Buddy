import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import styles from "../Filter/filter-page.module.scss";
import { useState, useParams } from "react";

export const FilterPage = () => {
	const [sliderValue, setSliderValue] = useState(1);
	const [clickedItems, setClickedItems] = useState({});
	const [selectedCategories, setSelectedCategories] = useState([]); // Zustand der ausgewählten Kategorien
	const [maxRating, setMaxRating] = useState(5);

	const handleCategoryClick = (category) => {
		if (selectedCategories.includes(category)) {
			setSelectedCategories((prevState) => prevState.filter((item) => item !== category)); // Entferne die Kategorie aus den ausgewählten Kategorien
		} else {
			setSelectedCategories((prevState) => [...prevState, category]); // Füge die Kategorie zu den ausgewählten Kategorien hinzu
		}
	};

	const handleMaxRatingChange = (event) => {
		setMaxRating(parseInt(event.target.value));
	};

	const handleSliderChange = (event) => {
		setSliderValue(parseInt(event.target.value));
	};

	const handleClick = (item) => {
		setClickedItems((prevState) => ({
			...prevState,
			[item]: !prevState[item] // Toggle the clicked state
		}));
	};

	const isClicked = (item) => {
		return clickedItems[item] ? styles.clicked : "";
	};

	const handleAllClearClick = () => {
		setClickedItems({});
		setSliderValue(0);
		setSelectedCategories([]);
		setMaxRating(5);
	};

	const handleApplyClick = () => {
		const queryParams = new URLSearchParams();

		if (sliderValue > 0) {
			queryParams.set("minPrize", 0);
			queryParams.set("maxPrize", sliderValue);
		}

		if (selectedCategories.length > 0) {
			queryParams.set("categories", selectedCategories.join(","));
		}

		queryParams.set("maxRating", maxRating);

		window.location.href = `/items?${queryParams.toString()}`;
	};

	return (
		<>
			<section className={styles.filterPage}>
				<div className={styles.headerFilterPage}>
					<GoBackButton />
					<h1>Filters</h1>
				</div>

				<div className={styles.filterArea}>
					<div className={styles.sortContainer}>
						<article className={styles.sortArea}>
							<h4>Sort By</h4>
							<h5 onClick={handleAllClearClick}>All Clear</h5>
						</article>
						<div className={styles.choiceFilter}>
							<p className={isClicked("Lowest")} onClick={() => handleClick("Lowest")}>
								Lowest
							</p>
							<p className={isClicked("Highest")} onClick={() => handleClick("Highest")}>
								Highest
							</p>
							<p className={isClicked("Best")} onClick={() => handleMaxRatingChange("Best")}>
								Best
							</p>
							<p className={isClicked("Newest")} onClick={() => handleClick("Newest")}>
								Newest
							</p>
						</div>
					</div>

					<div className={styles.priceContainer}>
						<h4>Price</h4>
						<input
							type="range"
							min="0"
							max="250"
							value={sliderValue}
							className={styles.rangeSlider}
							onChange={handleSliderChange}
						/>
						<h3>
							<span>{sliderValue}</span> €
						</h3>
					</div>

					<div className={styles.categoryContainer}>
						<h4>Category</h4>
						<article>
							<p className={isClicked("Fruits")} onClick={() => handleCategoryClick("Fruits")}>
								Fruits
							</p>
							<p className={isClicked("Seafood")} onClick={() => handleCCategorylick("Seafood")}>
								Seafood
							</p>
							<p className={isClicked("Bread")} onClick={() => handleCategoryClick("Bread")}>
								Bread
							</p>
							<p className={isClicked("Frozen")} onClick={() => handleCategoryClick("Frozen")}>
								Frozen
							</p>
							<p className={isClicked("Organic")} onClick={() => handleCategoryClick("Organic")}>
								Organic
							</p>
							<p className={isClicked("Milk & Egg")} onClick={() => handleCategoryClick("Milk & Egg")}>
								Milk & Egg
							</p>
							<p className={isClicked("Meat")} onClick={() => handleCategoryClick("Meat")}>
								Meat
							</p>
						</article>
					</div>
					<button onClick={handleApplyClick}>Apply</button>
				</div>
			</section>
		</>
	);
};

