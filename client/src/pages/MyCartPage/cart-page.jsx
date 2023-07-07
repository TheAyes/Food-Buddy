import { useState } from "react";
import styles from "./cart-page.module.scss";

// Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { WishItem } from "../../components/WishItem/WishItem.jsx";

// Import Images
import trashCan from "../../pics/trashcan.svg";
import emptyCart from "../../pics/emptyCart.svg";

export const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);

	const handleLikeButtonClick = (itemId, isLiked) => {
		if (isLiked) {
			// Element aus dem Warenkorb entfernen
			const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
			setCartItems(updatedCartItems);
		} else {
			// Element zum Warenkorb hinzufügen
			const itemToAdd =
				/* Logik, um das Element anhand der itemId zu finden */
				setCartItems([...cartItems, itemToAdd]);
		}
	};

	return (
		<section className={styles.cartPage}>
			<div className={styles.headerCart}>
				<article className={styles.leftContainer}>
					<GoBackButton />
					<h4>My Cart</h4>
				</article>
				<img className={styles.trashCan} src={trashCan} alt="Mülleimer" />
			</div>
			<img className={styles.emptyCartImage} src={emptyCart} alt="empty Wishlist" />
			<div className={styles.cartContainer}>
				{cartItems.map((item) => (
					<WishItem
						key={item.id}
						id={item.id}
						name={item.name}
						rating={item.rating}
						numOfRatings={item.numOfRatings}
						price={item.price}
						onLikeButtonClick={handleLikeButtonClick}
					/>
				))}
			</div>
			<button className={styles.checkoutButton}>CHECK OUT</button>
		</section>
	);
};
