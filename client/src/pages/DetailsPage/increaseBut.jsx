import React, { useState } from 'react';

export const IncreaseButton = () => {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(count + 1);
        console.log(count);
        setCount(count + 1);
        console.log(count)
    };

    return (
        <button onClick={increaseCount}>Erhöhe um 2</button>
    );
};

