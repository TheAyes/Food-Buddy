import GrünerBalken from "../../components/GrünerBalken/GrünerBalken";
import styles from "../Filter/filter-page.module.scss";
import { useState } from "react";

export const FilterPage = () => {
	const [sliderValue, setSliderValue] = useState(1);
	const [clickedItems, setClickedItems] = useState({});

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
	};

	return (
		<>
			<section className={styles.filterPage}>
				<div className={styles.headerFilterPage}>
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
							<p className={isClicked("Best")} onClick={() => handleClick("Best")}>
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
							<p className={isClicked("Fruits")} onClick={() => handleClick("Fruits")}>
								Fruits
							</p>
							<p className={isClicked("Seafood")} onClick={() => handleClick("Seafood")}>
								Seafood
							</p>
							<p className={isClicked("Bread")} onClick={() => handleClick("Bread")}>
								Bread
							</p>
							<p className={isClicked("Frozen")} onClick={() => handleClick("Frozen")}>
								Frozen
							</p>
							<p className={isClicked("Organic")} onClick={() => handleClick("Organic")}>
								Organic
							</p>
							<p className={isClicked("Milk & Egg")} onClick={() => handleClick("Milk & Egg")}>
								Milk & Egg
							</p>
							<p className={isClicked("Meat")} onClick={() => handleClick("Meat")}>
								Meat
							</p>
						</article>
					</div>
					<button>Apply</button>
				</div>
			</section>
		</>
	);
};

