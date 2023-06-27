import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/Landingpage/landing-page.jsx";
import { NotFound } from "./pages/NotFound/not-found.jsx";
import { ProfilePage } from "./pages/Profil/profile-page.jsx";
import { HomePage } from "./pages/Homepage/home-page.jsx";
import { ItemDetails } from "./pages/DetailsPage/item-details.jsx";
import { CartPage } from "./pages/MyCartPage/cart-page.jsx";
import { WishlistPage } from "./pages/WishList/wishlist-page.jsx";
import { OrderHistoryPage } from "./pages/OrderHistory/order-history-page.jsx";
import { ItemList } from "./pages/ItemList/item-list.jsx";
import { FilterPage } from "./pages/Filter/filter-page.jsx";
import { ProductItems } from "./components/ProductItems/ProductItems.jsx";

export const App = () => {
	return (
<<<<<<< HEAD
		<div>
			<ItemList />
=======
		<>
>>>>>>> origin/main
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/itemlist" element={<ItemList />} />
				<Route path="/item/:id" element={<ItemDetails />} />
<<<<<<< HEAD
				<Route path="filter" element={<FilterPage />} />
=======
>>>>>>> origin/main
				<Route path="/user/:id" element={<ProfilePage />} />
				<Route path="user/:id/cart" element={<CartPage />} />
				<Route path="user/:id/wishlist" element={<WishlistPage />} />
				<Route path="user/:id/order-history" element={<OrderHistoryPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
<<<<<<< HEAD
		</div>
=======
			<ItemDetails></ItemDetails>
		</>
>>>>>>> origin/main
	);
};

