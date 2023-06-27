import { Link } from "react-router-dom";
import styles from "./ProductItems.module.scss";

export const ProductItems = (props) => {
	const { image, name, price } = props;
	const { value, unit } = price;
	console.log(props.product);

	return (
		<div className={styles.ProductItems}>
			<Link to={`ItemDetails/${props.id}`}>
				<div>
					<img src={props.image} alt="image" />
					<p>{props.name}</p>
					<div className={styles.flex}>
						<p>
							{value} {unit}
						</p>
						<p>{props.rating}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

