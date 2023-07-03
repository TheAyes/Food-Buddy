import React from "react";
import styles from "./LikeButton.module.scss";

// Import Images
import LikeButtonImg from "../../pics/likeButton.svg";
import LikeButtonRedImg from "../../pics/likeButtonRed.svg";

export const LikeButton = ({ isLiked, onClick }) => {
    return (
        <img
            className={styles.likeButton}
            src={isLiked ? LikeButtonRedImg : LikeButtonImg}
            alt="like Button"
            onClick={onClick}
        />
    );
};
