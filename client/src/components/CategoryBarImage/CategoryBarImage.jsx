import styles from "./CategoryBarImage.module.scss"
import { Link } from "react-router-dom";

import meat from "../../pics/meatLOGO.jpg"
import bread from "../../pics/breadLOGO.jpg"
import vegetables from "../../pics/vegetablesLOGO.jpg"
import seafood from "../../pics/seafoodLOGO.jpg"
import fruits from "../../pics/fruitLOGO.jpg"
import shadow from "../../pics/shadow.png"

export const CategoryBarImage = () => {
	return <>
		<div className={styles.CategoryBarImage}>
			<Link to="/itemlist?category=meat">
				<img src={meat} alt="meat" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Meat
			</Link>
			<Link to="/itemlist?category=bread">
				<img src={bread} alt="bread" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Bread
			</Link>
			<Link to="/itemlist?category=seafood">
				<img src={seafood} alt="seafood" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Seafood
			</Link>
			<Link to="/itemlist?category=vegetables">
				<img src={vegetables} alt="vegetables" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Vegetables
			</Link>
			<Link to="/itemlist?category=fruits">
				<img src={fruits} alt="fruits" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Fruits
			</Link>
		</div>
	</>;
};

