import styles from "./CategoryBarImage.module.scss"
import { Link } from "react-router-dom";

import meat from "../../pics/meatLOGO.jpg"
import bread from "../../pics/breadLOGO.jpg"
import vegetables from "../../pics/vegetablesLOGO.jpg"
import seafood from "../../pics/seafoodLOGO.jpg"
import fruits from "../../pics/fruitLOGO.jpg"
import shadow from "../../pics/shadow.png"

export const CategoryBarImage = () => {
	return (
		<div className={styles.CategoryBarImage}>
			<Link to="/itemlist?category=649d50bd924b2f32645d0f24">
				<img src={meat} alt="meat" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Meat
			</Link>
			<Link to="/itemlist?category=649d85909011477c830b89d1">
				<img src={bread} alt="bread" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Bread
			</Link>
			<Link to="/itemlist?category=649d853e9011477c830b89cb">
				<img src={seafood} alt="seafood" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Seafood
			</Link>
			<Link to="/itemlist?category=649d85139011477c830b89c9">
				<img src={vegetables} alt="vegetables" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Vegetables
			</Link>
			<Link to="/itemlist?category=649d85519011477c830b89cd">
				<img src={fruits} alt="fruits" />
				<img src={shadow} alt="shadow" className={styles.shadow} />
				Fruits
			</Link>
		</div>);
};

