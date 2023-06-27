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
			<div>
				<GoBackButton />
				{/* Titel erstellen */}
				{/* Favorites Button */}
			</div>
			<article>
				<img src={props.image} alt={props.title} />
				<h3>{quantity}</h3>
				<h3>{props.quantity}</h3>
				<h3>{props.price}</h3>
				<h3>{props.name}</h3>
				<div>
					{/* Sternsymbol für Ratings */}
					<h3>{props.rating}</h3>
					<h3>{props.numOfRatings}</h3>
				</div>
			</article>
			<hr></hr>
			<div>
				<h3>Quantity</h3>
				<div>
					<button onClick={decrementQuantity}>-</button>
					<p>{quantity}</p>
					<button onClick={incrementQuantity}>+</button>
				</div>
				<button onClick={addToCart}>Add to Cart</button>
			</div>
		</section>
	);
};

