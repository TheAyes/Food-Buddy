import styles from "./AddToCartComponent.module.scss";
import React from "react";

export const AddToCartComponent = ({ quantity, addToCart }) => {
	return (
		<>
			<button className={styles.addCartButton} onClick={addToCart}>
				ADD TO CART
			</button>
		</>
	);
};
