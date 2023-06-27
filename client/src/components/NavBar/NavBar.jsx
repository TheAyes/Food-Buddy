import { Link } from "react-router-dom";
import home from "../../pics/homeLogoBlack.svg"
import orders from "../../pics/ordersLogoBlack.svg"
import shoppingcart from "../../pics/Cart.svg"
import wishlist from "../../pics/wishlistLogoBlack.svg"
import profile from "../../pics/profileLogoBlack.svg"
import styles from "./NavBar.module.scss"

export const NavBar = () => {
	return <>
		<nav className={styles.NavBar}>
			<Link to='/home'><img src={home} alt="home button" />Home</Link>
			<Link to='/user/:id/order-history'><img src={orders} alt="orders button" />Orders</Link>
			<Link to='/user/:id/cart'><img src={shoppingcart} alt="shoppingcart button" /></Link>
			<Link to='/user/:id/wishlist'><img src={wishlist} alt="wishlist button" />Wishlist</Link>
			<Link to='/user/:id'><img src={profile} alt="profile button" />Profile</Link>
		</nav>
	</>;
};

