import styles from './WishItem.module.scss';
import React, { useState } from 'react';

// Import Komponenten
import { LikeButton } from '../LikeButton/LikeButton';

// Import Bilder
import starImage from "../../pics/star.svg";


export const WishItem = (props) => {
	const [quantity, setQuantity] = useState(0);

	const incrementQuantity = () => {
		setQuantity(previousQuantity => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity(previousQuantity => Math.max(previousQuantity - 1, 0));
	};

	return (
		<>
			<section className={styles.wishItem}>
				<img src="https://source.unsplash.com/random/1600x900"
					// {props.image} EINFÜGEN
					alt={props.title} />
				<div className={styles.infoSection}>
					<h3 className={styles.nameIndicator}>{props.name}</h3>
					<div className={styles.ratingSection}>
						<img src={starImage} alt="rating star" />
						<h3 className={styles.ratingIndicator}>{props.rating}</h3>
						<h3 className={styles.reviewIndicator}>({props.numOfRatings})</h3>
					</div>
					<div className={styles.priceSection}>
						<h2 className={styles.priceIndicator}>{props.price}</h2>
						<LikeButton className={styles.likeButton} />
					</div>
				</div>
				<div className={styles.selectQuantity}>
					<button className={styles.minusQuantity} onClick={decrementQuantity}>-</button>
					<p className={styles.numberQuantity}>{quantity}</p>
					<button className={styles.plusQuantity} onClick={incrementQuantity}>+</button>
				</div>
			</section>
		</>
	);
}
