import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landing-page.jsx";
import { NotFound } from "./pages/not-found.jsx";
import { ProfilePage } from "./pages/profile-page.jsx";
import { HomePage } from "./pages/home-page.jsx";
import { ItemDetails } from "./pages/item-details.jsx";
import { CartPage } from "./pages/cart-page.jsx";
import { WishlistPage } from "./pages/wishlist-page.jsx";
import { OrderHistoryPage } from "./pages/order-history-page.jsx";

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<LandingPage />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="/item/:id" element={<ItemDetails />} />
			<Route path="/user/:id" element={<ProfilePage />} />
			<Route path="user/:id/cart" element={<CartPage />} />
			<Route path="user/:id/wishlist" element={<WishlistPage />} />
			<Route path="user/:id/order-history" element={<OrderHistoryPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
