import { Link } from "react-router-dom";
import { LikeButton } from "../LikeButton/LikeButton.jsx";
import star from "../../pics/star.png";
import styles from "./ProductItems.module.scss";

export const ProductItems = (props) => {
	const { image, name, price } = props;
	const { value, unit } = price;
	console.log(props.product);

	return (
		<div className={styles.ProductItems}>
			<Link to={`ItemDetails/${props.id}`}>
				<div>
					<img src={props.image} alt="image" className={styles.itemImages} />
					<p className={styles.productName}>{props.name}</p>
					<div className={styles.flex}>
						<p>
							{value} {unit}
						</p>
						<img src={star} className={styles.star} />
						<p> {props.rating}</p>
						{/* <LikeButton /> */}
					</div>
				</div>
			</Link>
		</div>
	);
};

