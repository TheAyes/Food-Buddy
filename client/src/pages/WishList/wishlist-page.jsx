import React, { useState } from 'react';
import styles from './wishlist-page.module.scss';

//Import Components
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { NavBar } from '../../components/NavBar/NavBar';
import { WishItem } from '../../components/WishItem/WishItem';

// Import Images
import emptyWishlist from "../../pics/emptyWishlist.svg"

export const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);

    const handleLikeButtonClick = (itemId, isLiked) => {
        if (isLiked) {
            // Element aus Wishlist entfernen
            const updatedWishlist = wishlist.filter(item => item.id !== itemId);
            setWishlist(updatedWishlist);
        } else {
            // Element zur Wishlist hinzufügen
            const itemToAdd = /* Logik, um das Element anhand der itemId zu finden */
                setWishlist([...wishlist, itemToAdd]);
        }
    };

    return (
        <section className={styles.wishlistPage}>
            <div className={styles.headerWishlist}>
                <GoBackButton />
                <h4>Wishlist</h4>
                {/* Löschen Button */}
            </div>
            <img className={styles.emptyWishImage} src={emptyWishlist} alt="empty Wishlist" />
            <div className={styles.wishlistContainer}>
                {wishlist.map(item => (
                    <WishItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        rating={item.rating}
                        numOfRatings={item.numOfRatings}
                        price={item.price}
                        onLikeButtonClick={handleLikeButtonClick}
                    />
                ))}
            </div>
            <NavBar />
        </section>
    );
};
