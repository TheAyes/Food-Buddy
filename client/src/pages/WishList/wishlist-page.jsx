import styles from './wishlist-page.module.scss';
import { GoBackButton } from "../../components/GoBackButton/GoBackButton";
import { NavBar } from '../../components/NavBar/NavBar';

// import React, { useState } from 'react';

export const WishlistPage = () => {
    return (
        <section className={styles.wishlistPage}>
            <div className={styles.headerWishlist}>
                <GoBackButton />
                <h4 >Wishlist</h4>
                {/* Löschen Button */}
            </div>
            <NavBar />
        </section>
    )
};
