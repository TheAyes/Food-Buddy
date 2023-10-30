import { useState } from "react";
import { Link } from "react-router-dom";
import { CategoryBarImage } from "../../components/CategoryBarImage/CategoryBarImage";
import { DealList } from "../../components/DealList/DealList";
import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import styles from "./Homepage.module.scss";
import FilterIcon from "../../pics/FilterIcon.svg";
import { FilterPage } from "../Filter/filter-page.jsx";
import GrünerBalken from "../../components/GrünerBalken/GrünerBalken";

export const HomePage = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const filterButtonClass = `${styles.filterButton} ${showDropdown ? styles.rotate : ""}`;

	return (
		<div className={styles.Homepage}>
			<GrünerBalken />
			<div className={styles.containerFilter}>
				<div className={styles.containerFilter2}>
					<div className={styles.upperPart}>
						<button className={filterButtonClass} onClick={toggleDropdown}>
							<img src={FilterIcon} alt="Filter Icon" id="filterIcon" />
						</button>
					</div>
					<div className={styles.searchBarContainer}>
						<SearchBar />
					</div>
				</div>
				{showDropdown && (
					<div className={styles.dropdownMenu}>
						<FilterPage />
					</div>
				)}
			</div>

			<section>
				<div>
					<Link to="/itemlist">Get 20% OFF</Link>
				</div>
				<div>
					<Link to="/itemlist">Get 40% OFF</Link>
				</div>
			</section>
			<CategoryBarImage />
			<div className={styles.fruitsBanner}>
				<Link to="/itemlist?category=649d85519011477c830b89cd">Naturally Sweet, Nutritious Treats: Embrace the Power of Healthy Fruits</Link>
			</div>
			<DealList amount={6} offset={95} />
			<div className={styles.seafoodBanner}>
				<Link to="/itemlist?category=649d853e9011477c830b89cb">Dive into Freshness: Seafood Delights that Make Waves in Flavor</Link>
			</div>
			<DealList amount={6} offset={64} />
			<div className={styles.meatBanner}>
				<Link to="/itemlist?category=649d50bd924b2f32645d0f24">Savor the Flavor, Embrace the Meat: Fuel Your Body with Protein Power</Link>
			</div>
			<DealList amount={6} offset={140} />
			<div className={styles.breadBanner}>
				<Link to="/itemlist?category=649d85909011477c830b89d1">Rise to the Taste: Savor the Finest Breads, Baked with Love</Link>
			</div>
			<DealList amount={6} offset={47} />
			<div className={styles.vegetablesBanner}>
				<Link to="/itemlist?category=649d85139011477c830b89c9">Fuel Your Body, Nurture Your Soul: Embrace a Healthy Lifestyle</Link>
			</div>
			<DealList amount={6} offset={5} />
			<NavBar />
		</div>
	);
};

