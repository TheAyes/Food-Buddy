import { useState } from "react";
import styles from "./cart-page.module.scss";

// Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { CartItem } from "../../components/CartItem/CartItem.jsx";

// Import Images
import trashCan from "../../pics/trashCan.svg";
import emptyCart from "../../pics/emptyCart.svg";
import { NavBar } from "../../components/NavBar/NavBar";

export const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);

	const handleButtonToAdd = (itemId, isAdd) => {
		if (isAdd) {
			// Element aus dem Warenkorb entfernen
			const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
			setCartItems(updatedCartItems);
		} else {
			// Element zum Warenkorb hinzufügen
			const itemToAdd = cartItems.find((item) => item.id === itemId);
			setCartItems((prevItems) => [...prevItems, itemToAdd]);
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
			{cartItems.length === 0 ? (
				<img className={styles.emptyCartImage} src={emptyCart} alt="empty Wishlist" />
			) : (
				<div className={styles.cartContainer}>
					{cartItems.map((item) => (
						<CartItem // du hattest hier Wishlist statt CartItem Komponente stehen
							key={item.id}
							id={item.id}
							name={item.name}
							rating={item.rating}
							numOfRatings={item.numOfRatings}
							price={item.price}
							onLikeButtonClick={handleButtonToAdd}
						/>
					))}
				</div>
			)}
			<button className={styles.checkoutButton}>CHECK OUT</button>
		</section>
	);
};

