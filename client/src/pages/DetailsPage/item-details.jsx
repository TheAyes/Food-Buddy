import { useContext, useEffect, useState } from "react";
import styles from "./item-details.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

// Bilder Import
import starImage from "../../pics/star.svg";
import cartImage from "../../pics/shopping-cart.svg";

// Components Import
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { AddToCartComponent } from "../../components/AddToCartComponent/AddToCartComponent";
import { LikeButton } from "../../components/LikeButton/LikeButton";
import { UserContext } from "../../app.jsx";

export const ItemDetails = () => {
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams();
	const [item, setItem] = useState(null);
	const userState = useContext(UserContext);
	const [isLiked, setIsLiked] = useState(false);

	useEffect(() => {
		axios.get(`/api/products/${id}`).then((response) => {
			setItem(response.data);
		});

		(async () => {
			const userInfo = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${userState.get.accessToken}`
				}
			});
			if (userInfo.data.user.wishlist.includes(id)) {
				setIsLiked(true);
			}
		})();
	}, [id]);

	if (!item) {
		return <div>Loading...</div>;
	}

	const incrementQuantity = () => {
		setQuantity((previousQuantity) => previousQuantity + 1);
	};

	const decrementQuantity = () => {
		setQuantity((previousQuantity) => Math.max(previousQuantity - 1, 1));
	};

	const addToCart = () => {
		console.log(`Menge ${quantity} zum Einkaufswagen hinzugefügt!`);
	};

	return (
		<section className={styles.itemDetails}>
			<div className={styles.upperPart}>
				<GoBackButton />
				{/* Titel erstellen */}
				<h4 className={styles.pageTitle}>{item.name}</h4>
				{/* Name als props von der ID, damit immer korrekter Produktname verwendet wird */}
				<LikeButton id={id} initialLiked={isLiked} />
			</div>
			<article className={styles.imageSection}>
				<img src={item.image} alt={item.title} />
				<h3 className={styles.quantityIndicator}>{quantity}kg</h3>
				{/* <h3>{props.quantity}</h3> */}
				<h2 className={styles.priceIndicator}>
					{item.price.value} {item.price.unit}
				</h2>
				<h3 className={styles.nameIndicator}>{item.name}</h3>
				<div className={styles.ratingSection}>
					<img src={starImage} alt="rating star" />
					<h3 className={styles.ratingIndicator}>{item.overallRating.toFixed(2)}</h3>
					<h3 className={styles.reviewIndicator}>({item.ratings.length})</h3>
				</div>
			</article>
			<hr></hr>
			<div className={styles.quantitySection}>
				<h3 className={styles.quantityTitle}>Quantity</h3>
				<div className={styles.selectQuantity}>
					<button className={styles.minusQuantity} onClick={decrementQuantity}>
						-
					</button>
					<p className={styles.numberQuantity}>{quantity} kg</p>
					<button className={styles.plusQuantity} onClick={incrementQuantity}>
						+
					</button>
				</div>
				<article className={styles.shoppingSection}>
					<img src={cartImage} alt="cart image" />
					<p className={styles.quantityCart}></p>
					<AddToCartComponent quantity={quantity} addToCart={addToCart} />
				</article>
			</div>
		</section>
	);
};
