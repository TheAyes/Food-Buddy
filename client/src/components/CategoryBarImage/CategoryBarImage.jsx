import styles from "./CategoryBarImage.module.scss"
import { Link } from "react-router-dom";
import meat from "../../pics/meatLOGO.jpg"
import bread from "../../pics/breadLOGO.jpg"
import vegetables from "../../pics/vegetablesLOGO.jpg"
import seafood from "../../pics/seafoodLOGO.jpg"
import fruits from "../../pics/fruitLOGO.jpg"

export const CategoryBarImage = () => {
	return (
		<div className={styles.CategoryBarImage}>
			<Link to="/itemlist?category=649d50bd924b2f32645d0f24">
				<img src={meat} alt="meat" />
				<div className="shadow"></div>
				Meat
			</Link>
			<Link to="/itemlist?category=649d85909011477c830b89d1">
				<img src={bread} alt="bread" />
				<div className="shadow"></div>
				Bread
			</Link>
			<Link to="/itemlist?category=649d853e9011477c830b89cb">
				<img src={seafood} alt="seafood" />
				<div className="shadow"></div>
				Seafood
			</Link>
			<Link to="/itemlist?category=649d85139011477c830b89c9">
				<img src={vegetables} alt="vegetables" />
				<div className="shadow"></div>
				Vegetables
			</Link>
			<Link to="/itemlist?category=649d85519011477c830b89cd">
				<img src={fruits} alt="fruits" />
				<div className="shadow"></div>
				Fruits
			</Link>
		</div>);
};

