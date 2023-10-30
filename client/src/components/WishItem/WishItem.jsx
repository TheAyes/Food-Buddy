import React, { useState } from "react";
import styles from "./WishItem.module.scss";

// Import Komponenten
import { LikeButton } from "../LikeButton/LikeButton.jsx";

// Import Images
import starImage from "../../pics/star.svg";

export const WishItem = ({ id, name, rating, numOfRatings, price, onLikeButtonClick, image, isLikedProp = false }) => {
	const [quantity, setQuantity] = useState(0);
	const [isLiked, setIsLiked] = useState(isLikedProp);

	const incrementQuantity = () => {
		setQuantity((previousQuantity) => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity((previousQuantity) => Math.max(previousQuantity - 1, 0));
	};

	const handleLikeButtonClick = () => {
		setIsLiked(!isLiked);
		onLikeButtonClick(id, !isLiked);
	};

	return (
		<section className={styles.wishItem}>
			<img src={image} alt={name} />
			<div className={styles.infoSection}>
				<p className={styles.nameIndicator}>{name}</p>
				<div className={styles.ratingSection}>
					<img src={starImage} alt="rating star" />
					<p className={styles.ratingIndicator}>{rating}</p>
					<p className={styles.reviewIndicator}>({numOfRatings})</p>
				</div>
				<div className={styles.priceSection}>
					<p className={styles.priceIndicator}>{price}</p>
					<LikeButton
						className={styles.likeButton}
						initialLiked={isLiked}
						onClick={handleLikeButtonClick}
						id={id}
					/>
				</div>
			</div>
			<div className={styles.selectQuantity}>
				<button className={styles.minusQuantity} onClick={decrementQuantity}>
					-
				</button>
				<p className={styles.numberQuantity}>{quantity} kg</p>
				<button className={styles.plusQuantity} onClick={incrementQuantity}>
					+
				</button>
			</div>
		</section>
	);
};
