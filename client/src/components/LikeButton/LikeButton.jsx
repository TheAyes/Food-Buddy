import React, { useState } from 'react';
import styles from './LikeButton.module.scss';

import LikeButtonImg from '../../pics/likeButton.svg';
import LikeButtonRedImg from '../../pics/likeButtonRed.svg';

export const LikeButton = ({ initialLiked = false }) => {
    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
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
