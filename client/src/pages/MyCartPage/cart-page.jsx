import { useContext, useEffect, useState } from "react";
import styles from "./cart-page.module.scss";

// Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { WishItem } from "../../components/WishItem/WishItem.jsx";

// Import Images
import trashCan from "../../pics/trashcan.svg";
import emptyCart from "../../pics/emptyCart.svg";
import { NavBar } from "../../components/NavBar/NavBar";
import { FilterPage } from "../Filter/filter-page";
import { UserContext } from "../../app.jsx";
import GrünerBalken from "../../components/GrünerBalken/GrünerBalken";

export const CartPage = () => {
	const [cartItems, setCartItems] = useState([]);
	const userState = useContext(UserContext);

	useEffect(() => {
		setCartItems(userState.get.cart);
	}, []);

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
			<GrünerBalken />
			<div className={styles.headerCart}>
				<article className={styles.leftContainer}>
					<GoBackButton />
					<h4>My Cart</h4>
				</article>
				<img className={styles.trashCan} src={trashCan} alt="Mülleimer" />
			</div>
			{cartItems.length <= 0 && <img className={styles.emptyCartImage} src={emptyCart} alt="empty Wishlist" />}
			<div className={styles.cartContainer}>
				{cartItems.map((item) => {
					console.log(item);
					return (
						<WishItem
							key={item.product._id}
							id={item.product._id}
							name={item.product.name}
							image={item.product.image}
							rating={item.product.overallRating.toFixed(2)}
							numOfRatings={item.product.ratings.length}
							price={item.product.price.value}
							onLikeButtonClick={handleLikeButtonClick}
						/>
					);
				})}
			</div>
			<button className={styles.checkoutButton}>CHECK OUT</button>
			<NavBar />
		</section>
	);
};

