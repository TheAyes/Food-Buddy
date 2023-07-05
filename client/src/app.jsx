import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/Landingpage/landing-page.jsx";
import { NotFound } from "./pages/NotFound/not-found.jsx";
import { ProfilePage } from "./pages/Profil/profile-page.jsx";
import { HomePage } from "./pages/Homepage/home-page.jsx";
import { ItemDetails } from "./pages/DetailsPage/item-details.jsx";
import { CartPage } from "./pages/MyCartPage/cart-page.jsx";
import { WishlistPage } from "./pages/Wishlist/wishlist-page.jsx";
import { OrderHistoryPage } from "./pages/OrderHistory/order-history-page.jsx";
import { ItemList } from "./pages/ItemList/item-list.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { LandPageTwo } from "./pages/LandPageTwo/land-page-two.jsx";
import { createContext, useState } from "react";

export const UserContext = createContext(null);
export const App = () => {
	/** @Vanessa - Bei deinem Login dann einfach setUserState() machen und das resultierende objekt des api aufrufs
	 * dann als parameter einfügen
	 * --> const response = await axios.post("/api/user/login", {username: "", password: ""}) <--
	 * --> setUserState(response.data) <--
	 *
	 * Das können wir dann wie folgt nutzen:
	 * --> import UserContext from "path/to/app.jsx" <--
	 *
	 * in deiner Komponente:
	 * --> const [userState, setUserState] = useContext(UserContext); <-- **/
	const [userState, setUserState] = useState(null);
	return (
		<>
			<UserContext.Provider value={[userState, setUserState]}>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/landingpage/2" element={<LandPageTwo />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/itemlist" element={<ItemList />} />
					<Route path="/item/:id" element={<ItemDetails />} />
					<Route path="/user" element={<ProfilePage />} />
					<Route path="/user/cart" element={<CartPage />} />
					<Route path="/user/wishlist" element={<WishlistPage />} />
					<Route path="/user/order-history" element={<OrderHistoryPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</UserContext.Provider>
		</>
	);
};
