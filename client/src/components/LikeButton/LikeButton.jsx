import React, { useContext, useState } from "react";
import styles from "./LikeButton.module.scss";

import LikeButtonImg from "../../pics/likeButton.svg";
import LikeButtonRedImg from "../../pics/likeButtonRed.svg";
import axios from "axios";
import { UserContext } from "../../app.jsx";

export const LikeButton = ({ initialLiked = false, id }) => {
	const [isLiked, setIsLiked] = useState(initialLiked);
	const userState = useContext(UserContext);

	const handleLikeClick = () => {
		(async () => {
			const result = await axios.post(
				`/api/products/${id}/wishlist`,
				{},
				{
					headers: {
						Authorization: `Bearer ${userState.get.accessToken}`
					}
				}
			);
			if (result.status === 200) {
				setIsLiked(result.data.wishlist.includes(id));
			}
		})();
	};

	return (
		<img
			className={styles.likeButton}
			src={isLiked ? LikeButtonRedImg : LikeButtonImg}
			alt="Like Button"
			onClick={handleLikeClick}
		/>
	);
};
