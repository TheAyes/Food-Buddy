//NOCH NICHT LÖSCHEN - AUSKOMMENTIERTER CODE IST MIT FUNKTIONSLOGIK ZUM HINZUFÜGEN ZUR WISHLIST. DER AUSKOMMENTIERTE MUSS GEPRÜFT  UND EVTL MIT DEM JETZIGEN CODE ERSETZT WERDEN
// DIE ITEM ID MIT RICHTIGEN IDS ERSETZEN!

import { useState } from "react";
// Import Images
import LikeButtonImg from "../../pics/likeButton.svg";
import LikeButtonRedImg from "../../pics/likeButtonRed.svg";
// Import Styling
import styles from "../LikeButton/LikeButton.module.scss";

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
            className={styles.likeButton}
            src={isLiked ? LikeButtonRedImg : LikeButtonImg}
            alt="like Button"
            onClick={likeButtonClick}
        />
    );
};




// import { useState } from "react";
// import LikeButtonImg from "../../pics/likeButton.svg";
// import LikeButtonRedImg from "../../pics/likeButtonRed.svg";

// export const LikeButton = () => {
//     const [istGeliked, setIstGeliked] = useState(false);

//     const likeButtonClick = () => {
//         setIstGeliked(!istGeliked);

//         // Hier kannst du die Logik hinzufügen, um das Element zur Wunschliste hinzuzufügen oder daraus zu entfernen
//         if (istGeliked) {
//             // Element aus der Wunschliste entfernen
//             removeItemFromWishlist(itemId);
//         } else {
//             // Element zur Wunschliste hinzufügen
//             addItemToWishlist(itemId);
//         }
//     };

//     const removeItemFromWishlist = (itemId) => {
//         // Hier kannst du die Logik zum Entfernen des Elements aus der Wunschliste implementieren
//         console.log(`Element ${itemId} wurde von der Wunschliste entfernt.`);
//     };

//     const addItemToWishlist = (itemId) => {
//         // Hier kannst du die Logik zum Hinzufügen des Elements zur Wunschliste implementieren
//         console.log(`Element ${itemId} wurde zur Wunschliste hinzugefügt.`);
//     };

//     return (
//         <img
//             src={istGeliked ? LikeButtonRedImg : LikeButtonImg}
//             alt="Like Button"
//             onClick={likeButtonClick}
//         />
//     );
// };
