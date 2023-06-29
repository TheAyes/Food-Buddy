import React, { useState } from 'react';
import styles from './item-details.module.scss';

// Bilder Import
import starImage from "../../pics/star.svg";
import cartImage from "../../pics/shopping-cart.svg";
import heartImage from "../../pics/likeButton.svg";

// Components Import
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { AddToCartComponent } from '../../components/AddToCartComponent/AddToCartComponent';

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
	};

	return (
		<section className={styles.itemDetails}>
			<div className={styles.upperPart}>
				<GoBackButton />
				{/* Titel erstellen */}
				<h4 className={styles.pageTitle}>testName</h4>
				{/* Favorites Button */}
				<img src={heartImage} alt="like Button" />
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
					<img src={starImage} alt="rating star" />
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
				<article className={styles.shoppingSection}>
					<img src={cartImage} alt="cart image" />
					<p>99</p>
					<AddToCartComponent quantity={quantity} addToCart={addToCart} />
				</article>
			</div>
		</section>
	);
};
