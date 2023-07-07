import React, { useState } from "react";
import { LikeButton } from "../LikeButton/LikeButton";
import starImage from "../../pics/star.svg";
import styles from "./CartItem.module.scss";

export const CartItem = ({ id, name, rating, numOfRatings, price, onLikeButtonClick }) => {
	const [quantity, setQuantity] = useState(0);

	const incrementQuantity = () => {
		setQuantity((previousQuantity) => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity((previousQuantity) => Math.max(previousQuantity - 1, 0));
	};

	const handleLikeButtonClick = (isLiked) => {
		onLikeButtonClick(id, isLiked);
	};

	return (
		<section className={styles.cartItem}>
			<img src="https://source.unsplash.com/random/1600x900" alt={name} />
			<div className={styles.infoSection}>
				<h3 className={styles.nameIndicator}>{name}</h3>
				<div className={styles.ratingSection}>
					<img src={starImage} alt="rating star" />
					<p className={styles.ratingIndicator}>{rating}</p>
					<p className={styles.reviewIndicator}>({numOfRatings})</p>
				</div>
				<div className={styles.priceSection}>
					<p className={styles.priceIndicator}>{price}</p>
					<LikeButton
						initialLiked={false} // Setze den initialLiked-Wert entsprechend
						onLikeButtonClick={handleLikeButtonClick}
					/>
				</div>
			</div>
			<div className={styles.selectQuantity}>
				<button className={styles.minusQuantity} onClick={decrementQuantity}>
					-
				</button>
				<p className={styles.numberQuantity}>{quantity}</p>
				<button className={styles.plusQuantity} onClick={incrementQuantity}>
					+
				</button>
			</div>
		</section>
	);
};
