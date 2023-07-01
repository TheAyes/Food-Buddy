
import React from "react";
import LikeButtonImg from "../../pics/likeButton.svg";
import LikeButtonRedImg from "../../pics/likeButtonRed.svg";
import styles from "./LikeButton.module.scss";

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
