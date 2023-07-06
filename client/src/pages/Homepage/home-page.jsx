import { CategoryBarImage } from "../../components/CategoryBarImage/CategoryBarImage";
import { DealList } from "../../components/DealList/DealList";
import { NavBar } from "../../components/NavBar/NavBar";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import styles from "./Homepage.module.scss";

export const HomePage = () => {
	return (
		<div className={styles.Homepage}>
			<SearchBar />
			<section>
				<div>
					<p>Get 20% OFF</p>
				</div>
				<div>
					<p>Get 40% OFF</p>
				</div>
			</section>
			<CategoryBarImage />
			<div className={styles.fruitsBanner}>
				<p>Naturally Sweet, Nutritious Treats: Embrace the Power of Healthy Fruits</p>
			</div>
			<DealList amount={6} offset={95} />
			<div className={styles.seafoodBanner}>
				<p>Dive into Freshness: Seafood Delights that Make Waves in Flavor</p>
			</div>
			<DealList amount={6} offset={64} />
			<div className={styles.meatBanner}>
				<p>Savor the Flavor, Embrace the Meat: Fuel Your Body with Protein Power</p>
			</div>
			<DealList amount={6} offset={140} />
			<div className={styles.breadBanner}>
				<p>Rise to the Taste: Savor the Finest Breads, Baked with Love</p>
			</div>
			<DealList amount={6} offset={47} />
			<div className={styles.vegetablesBanner}>
				<p>Fuel Your Body, Nurture Your Soul: Embrace a Healthy Lifestyle</p>
			</div>
			<DealList amount={6} offset={5} />
			<NavBar />
		</div>
	);
};
