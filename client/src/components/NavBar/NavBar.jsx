import { Link } from "react-router-dom";
import { useState } from "react";
import home from "../../pics/homeLogoBlack.svg"
import orders from "../../pics/ordersLogoBlack.svg"
import shoppingcart from "../../pics/Cart.svg"
import wishlist from "../../pics/wishlistLogoBlack.svg"
import profile from "../../pics/profileLogoBlack.svg"
import styles from "./NavBar.module.scss"

export const NavBar = () => {
	const [selectedButton, setSelectedButton] = useState('home');

	const handleButtonClick = (buttonName) => {
		setSelectedButton(buttonName);
	};

	return (
		<nav className={styles.NavBar}>
			<Link to="/home" onClick={() => handleButtonClick('home')}>
				<img src={home} alt="home button" className={selectedButton === 'home' ? styles.selected : ''} />
				Home
			</Link>
			<Link to="/user/order-history" onClick={() => handleButtonClick('orders')}>
				<img src={orders} alt="orders button" className={selectedButton === 'orders' ? styles.selected : ''} />
				Orders
			</Link>
			<Link to="/user/cart">
				<img src={shoppingcart} alt="shoppingcart button" />
			</Link>
			<Link to="/user/wishlist" onClick={() => handleButtonClick('wishlist')}>
				<img src={wishlist} alt="wishlist button" className={selectedButton === 'wishlist' ? styles.selected : ''} />
				Wishlist
			</Link>
			<Link to="/user" onClick={() => handleButtonClick('profile')}>
				<img src={profile} alt="profile button" className={selectedButton === 'profile' ? styles.selected : ''} />
				Profile
			</Link>
		</nav>
	);
};