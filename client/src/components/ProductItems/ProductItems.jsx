import { Link } from "react-router-dom";
import { LikeButton } from "../LikeButton/LikeButton.jsx";
import star from "../../pics/star.png";
import styles from "./ProductItems.module.scss";

export const ProductItems = (props) => {
	const { image, name, price } = props;
	const { value, unit } = price;

	return (
		<div className={styles.ProductItems}>
			<LikeButton className={styles.likeButton} />
			<div>
				<Link to={`/item/${props._id}`} className={styles.link}>
					<img src={props.image} alt="image" className={styles.itemImages} />
					<p className={styles.productName}>{props.name}</p>
					<div className={styles.flex}>
						<p>
							{value} {unit}
						</p>
						<img src={star} className={styles.star} alt="star" />
						<p> {props.rating}</p>
					</div>
				</Link>
			</div>
		</div>
	);
};
