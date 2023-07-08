import styles from "./AddToCartComponent.module.scss";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../app";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AddToCartComponent = ({ initialAdd = false, id }) => {
	const [addedToCart, setAddedToCart] = useState(inititalAdd);
	const userState = useContext(UserContext);
	const navigate = useNavigate();

	const handleItemClick = async () => {
		try {
			await axios.post(
				`/api/products/${id}/cart`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userState.get.accessToken}`
					}
				}
			);
			setAddedToCart(true);
			onAddToCart({ id, quantity });
		} catch (error) {
			// Fehlerbehandlung
		}
	};

	return (
		<>
			<button className={styles.addCartButton} onClick={handleItemClick} disabled={addedToCart}>
				{addedToCart ? "Added to Cart" : "Add to Cart"}
			</button>
		</>
	);
};

