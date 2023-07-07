import { useContext, useEffect, useState } from "react";
import styles from "./wishlist-page.module.scss";

//Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { WishItem } from "../../components/WishItem/WishItem.jsx";
import { NavBar } from "../../components/NavBar/NavBar.jsx";

// Import Images
import emptyWishlist from "../../pics/emptyWishlist.svg";
// import trashCan from "../../pics/trashCan.svg";
import { UserContext } from "../../app.jsx";
import axios from "axios";

export const WishlistPage = () => {
	const [wishlist, setWishlist] = useState([]);

	const userState = useContext(UserContext);

	useEffect(() => {
		(async () => {
			const userInfo = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${userState.get.accessToken}`
				}
			});

			// map over the wishlist and return array of promises
			const requests = userInfo.data.user.wishlist.map((item) => axios.get(`/api/products/${item}`));

			// wait for all promises to resolve
			const responses = await Promise.all(requests);

			// extract product data and update state
			const products = responses.map((response) => response.data);
			setWishlist(products);
		})();
	}, []);

	const handleLikeButtonClick = (itemId, isLiked) => {
		if (isLiked) {
			// Element aus Wishlist entfernen
			const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
			setWishlist(updatedWishlist);
		} else {
			// Element zur Wishlist hinzufügen
			const itemToAdd = wishlist.find((item) => item.id === itemId);
			setWishlist((prevWishlist) => [...prevWishlist, itemToAdd]);
		}
	};

	return (
		<section className={styles.wishlistPage}>
			<div className={styles.headerWishlist}>
				<article className={styles.leftContainer}>
					<GoBackButton />
					<h4>Wishlist</h4>
				</article>
				{/* <img className={styles.trashCan} src={trashCan} alt="trash can" /> */}
			</div>
			{wishlist.length <= 0 && <img className={styles.emptyWishImage} src={emptyWishlist} alt="empty Wishlist" />}
			<div className={styles.wishlistContainer}>
				{wishlist.map((item) => (
					<WishItem
						key={item._id}
						id={item._id}
						name={item.name}
						image={item.image}
						rating={item.overallRating.toFixed(2)}
						numOfRatings={item.ratings.length}
						price={item.price.value}
						onLikeButtonClick={handleLikeButtonClick}
						isLiked={true} // Setze isLiked auf true, da sich der Artikel in der Wishlist befindet
					/>
				))}
			</div>
			<NavBar />
		</section>
	);
};

// CODE WELCHES DIE MÖGLICHKEIT ENTHÄLT, MIT DER TRASHCAN ELEMENTE AUSZUWÄHLEN UND ZU LÖSCHEN.
// import React, { useState } from "react";
// import styles from "./wishlist-page.module.scss";

// export const WishlistPage = () => {
//     const [wishlist, setWishlist] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);

//     const handleLikeButtonClick = (itemId, isLiked) => {
//         if (isLiked) {
//             // Element zur Wishlist hinzufügen
//             const itemToAdd = wishlist.find((item) => item.id === itemId);
//             setWishlist((prevWishlist) => [...prevWishlist, itemToAdd]);
//         } else {
//             // Element aus Wishlist entfernen
//             const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
//             setWishlist(updatedWishlist);
//         }
//     };

//     const handleTrashCanClick = () => {
//         setSelectedItems([]);
//     };

//     const handleItemCheckboxChange = (itemId, isChecked) => {
//         if (isChecked) {
//             setSelectedItems((prevSelectedItems) => [
//                 ...prevSelectedItems,
//                 itemId,
//             ]);
//         } else {
//             setSelectedItems((prevSelectedItems) =>
//                 prevSelectedItems.filter((id) => id !== itemId)
//             );
//         }
//     };

//     const handleDeleteSelectedItems = () => {
//         const updatedWishlist = wishlist.filter(
//             (item) => !selectedItems.includes(item.id)
//         );
//         setWishlist(updatedWishlist);
//         setSelectedItems([]);
//     };

//     return (
//         <section className={styles.wishlistPage}>
//             <div className={styles.headerWishlist}>
//                 <article className={styles.leftContainer}>
//                     <GoBackButton />
//                     <h4>Wishlist</h4>
//                 </article>
//                 <img
//                     className={styles.trashCan}
//                     src={trashCan}
//                     alt="trash can"
//                     onClick={handleTrashCanClick}
//                 />
//             </div>
//             <img
//                 className={styles.emptyWishImage}
//                 src={emptyWishlist}
//                 alt="empty Wishlist"
//             />
//             <div className={styles.wishlistContainer}>
//                 {wishlist.map((item) => (
//                     <WishItem
//                         key={item.id}
//                         id={item.id}
//                         name={item.name}
//                         rating={item.rating}
//                         numOfRatings={item.numOfRatings}
//                         price={item.price}
//                         onLikeButtonClick={handleLikeButtonClick}
//                         onCheckboxChange={handleItemCheckboxChange}
//                         isSelected={selectedItems.includes(item.id)}
//                     />
//                 ))}
//             </div>
//             {selectedItems.length > 0 && (
//                 <button onClick={handleDeleteSelectedItems}>Delete Selected Items</button>
//             )}
//             <NavBar />
//         </section>
//     );
// };
