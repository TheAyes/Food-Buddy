import React, { useState } from 'react';
import styles from './WishItem.module.scss';

// Import Komponenten
import { LikeButton } from '../LikeButton/LikeButton';

// Import Images
import starImage from "../../pics/star.svg";

export const WishItem = ({ id, name, rating, numOfRatings, price, onLikeButtonClick }) => {
	const [quantity, setQuantity] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const incrementQuantity = () => {
		setQuantity(previousQuantity => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity(previousQuantity => Math.max(previousQuantity - 1, 0));
	};

	const handleLikeButtonClick = () => {
		setIsLiked(!isLiked);
		onLikeButtonClick(id, !isLiked);
	};

	return (
		<section className={styles.wishItem}>
			<img src="https://source.unsplash.com/random/1600x900" alt={name} />
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
						isLiked={isLiked}
						onClick={handleLikeButtonClick}
					/>
				</div>
			</div>
			<div className={styles.selectQuantity}>
				<button className={styles.minusQuantity} onClick={decrementQuantity}>-</button>
				<p className={styles.numberQuantity}>{quantity}</p>
				<button className={styles.plusQuantity} onClick={incrementQuantity}>+</button>
			</div>
		</section>
	);
};
