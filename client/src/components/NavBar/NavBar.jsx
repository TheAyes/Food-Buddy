import { Link, useLocation } from "react-router-dom";
import home from "../../pics/homeLogoBlack.svg";
import orders from "../../pics/ordersLogoBlack.svg";
import shoppingcart from "../../pics/Cart.svg";
import wishlist from "../../pics/wishlistLogoBlack.svg";
import profile from "../../pics/profileLogoBlack.svg";
import styles from "./NavBar.module.scss";

export const NavBar = () => {
	const location = useLocation();

	return (
		<nav className={styles.NavBar}>
			<Link to="/home">
				<img src={home} alt="home button" className={location.pathname === "/home" ? styles.selected : ""} />
				Home
			</Link>
			<Link to="/user/order-history">
				<img
					src={orders}
					alt="orders button"
					className={location.pathname === "/user/order-history" ? styles.selected : ""}
				/>
				Orders
			</Link>
			<Link to="/user/cart">
				<img src={shoppingcart} alt="shoppingcart button" className="shoppingCart" />
			</Link>
			<Link to="/user/wishlist">
				<img
					src={wishlist}
					alt="wishlist button"
					className={location.pathname === "/user/wishlist" ? styles.selected : ""}
				/>
				Wishlist
			</Link>
			<Link to="/user">
				<img
					src={profile}
					alt="profile button"
					className={location.pathname === "/user" ? styles.selected : ""}
				/>
				Profile
			</Link>
		</nav>
	);
};
