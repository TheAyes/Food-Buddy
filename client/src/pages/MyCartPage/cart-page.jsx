import { useContext, useEffect, useState } from "react";
import styles from "./cart-page.module.scss";

// Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { WishItem } from "../../components/WishItem/WishItem.jsx";

// Import Images
import trashCan from "../../pics/trashCan.svg";
import emptyCart from "../../pics/emptyCart.svg";
import { NavBar } from "../../components/NavBar/NavBar";
import { UserContext } from "../../app.jsx";
import axios from "axios";

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
			<div className={styles.headerCart}>
				<article className={styles.leftContainer}>
					<GoBackButton />
					<h4>My Cart</h4>
				</article>

				<button
					className={styles.trashCan}
					onClick={(event) => {
						(async () => {
							const response = await axios.delete(`/api/user/cart`, {
								headers: {
									Authorization: `Bearer ${userState.get.accessToken}`
								}
							});

							if (response.status === 200) {
								setCartItems([]);
							}
						})();
					}}
				>
					<p>Remove All</p>
					<img src={trashCan} alt="Mülleimer" />
				</button>
			</div>
			{cartItems.length <= 0 && <img className={styles.emptyCartImage} src={emptyCart} alt="empty Wishlist" />}
			<div className={styles.cartContainer}>
				{cartItems.map((item, index) => {
					console.log(item);
					return (
						<WishItem
							key={item.product._id + index}
							id={item.product._id}
							name={item.product.name}
							image={item.product.image}
							rating={item.product.overallRating?.toFixed(2)}
							numOfRatings={item.product.ratings?.length}
							price={item.product.price?.value}
							quantity={item.quantity}
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
