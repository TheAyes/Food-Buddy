import styles from './item-details.module.scss';
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import React, { useState } from 'react';

export const ItemDetails = (props) => {
	const [quantity, setQuantity] = useState(0);

	const incrementQuantity = () => {
		setQuantity(previousQuantity => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity(previousQuantity => Math.max(previousQuantity - 1, 0));
	};

	const addToCart = () => {
		console.log(`Menge ${quantity} zum Einkaufswagen hinzugefügt!`);
		// Füge hier die Logik zum Hinzufügen der ausgewählten Menge in den Einkaufswagen hinzu
	};

	return (
		<section className={styles.itemDetails}>
			<div className={styles.upperPart}>
				<GoBackButton />
				<h4 className={styles.pageTitle}>testName</h4>
				{/* Titel erstellen */}
				{/* Favorites Button */}
			</div>
			<article className={styles.imageSection}>
				<img src="https://source.unsplash.com/random/1600x900"
					// {props.image} EINFÜGEN
					alt={props.title} />
				<h3 className={styles.quantityIndicator}>{quantity}</h3>
				{/* <h3>{props.quantity}</h3> */}
				<h2 className={styles.priceIndicator}>99,99€{props.price}</h2>
				<h3 className={styles.nameIndicator}>testProdukt{props.name}</h3>
				<div className={styles.ratingSection}>
					{/* Sternsymbol für Ratings */}
					<h3 className={styles.ratingIndicator}>9,9{props.rating}</h3>
					<h3 className={styles.reviewIndicator}>(999 Reviews){props.numOfRatings}</h3>
				</div>
			</article>
			<hr></hr>
			<div className={styles.quantitySection}>
				<h3 className={styles.quantityTitle}>Quantity</h3>
				<div className={styles.selectQuantity}>
					<button className={styles.minusQuantity} onClick={decrementQuantity}>-</button>
					<p className={styles.numberQuantity}>{quantity}</p>
					<button className={styles.plusQuantity} onClick={incrementQuantity}>+</button>
				</div>
				{/* {Einkaufswagensymbol einbauen} */}
				<button className={styles.addCartButton} onClick={addToCart}>Add to Cart</button>
			</div>
		</section>
	);
};

