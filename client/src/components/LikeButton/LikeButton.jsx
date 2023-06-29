import { useState } from "react";
import LikeButtonImg from "../../pics/likeButton.svg";
import LikeButtonRedImg from "../../pics/likeButtonRed.svg";

export const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    const likeButtonClick = () => {
        setIsLiked(!isLiked);

        // Hier kannst du die Logik hinzufügen, um das Element zur Wishlist-Liste hinzuzufügen oder daraus zu entfernen
        if (isLiked) {
            // Element aus der Wishlist entfernen
            // removeItemFromWishlist(itemId);
        } else {
            // Element zur Wishlist hinzufügen
            // addItemToWishlist(itemId);
        }
    };

    return (
        <img
            src={isLiked ? LikeButtonRedImg : LikeButtonImg}
            alt="like Button"
            onClick={likeButtonClick}
        />
    );
};
