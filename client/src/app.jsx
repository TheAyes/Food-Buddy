import { Route, Routes, useLocation } from "react-router-dom";
import { LandingPage } from "./pages/Landingpage/landing-page.jsx";
import { NotFound } from "./pages/NotFound/not-found.jsx";
import { ProfilePage } from "./pages/Profil/profile-page.jsx";
import { HomePage } from "./pages/Homepage/home-page.jsx";
import { ItemDetails } from "./pages/DetailsPage/item-details.jsx";
import { CartPage } from "./pages/MyCartPage/cart-page.jsx";

import { OrderHistoryPage } from "./pages/OrderHistory/order-history-page.jsx";
import { ItemList } from "./pages/ItemList/item-list.jsx";
import { Register } from "./pages/Register/Register.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { LandPageTwo } from "./pages/LandPageTwo/land-page-two.jsx";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { WishlistPage } from "./pages/WishList/wishlist-page.jsx";

export const UserContext = createContext(null);
export const App = () => {
	const [userState, setUserState] = useState({
		accessToken: localStorage.getItem("access-token"),
		refreshToken: localStorage.getItem("refresh-token"),
		cart: []
	});
	const location = useLocation();
	console.log(userState);

	useEffect(() => {
		(async () => {
			if (!userState.accessToken || !userState.refreshToken) {
				setUserState((prevState) => {
					return {
						accessToken: localStorage.getItem("access-token"),
						refreshToken: localStorage.getItem("refresh-token"),
						cart: prevState.cart
					};
				});
			}
			const response = await axios.post(
				"/api/user/refresh",
				{},
				{
					headers: {
						Authorization: `Bearer ${userState.refreshToken}`
					}
				}
			);

			const userInfo = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${userState.accessToken}`
				}
			});

			localStorage.setItem("access-token", response.data.accessToken);
			localStorage.setItem("refresh-token", response.data.refreshToken);

			setUserState(() => {
				return {
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken,
					cart: userInfo.data.user.cart
				};
			});
		})();
	}, [location.pathname, userState.refreshToken]);
	return (
		<>
			<UserContext.Provider value={{ get: userState, set: setUserState }}>
				<Routes>
					<Route path="/" index element={<LandingPage />} />
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
