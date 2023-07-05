import React, { useState, useEffect } from "react";
import styles from "./DealList.module.scss";
import { DealItems } from "../DealItems/Dealitems";


export const DealList = ({ amount, offset = 0 }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/products");
            if (response.ok) {
                const data = await response.json();
                setProducts(data.slice(offset, offset + amount)); // Nur die ersten 6 Produkte
            } else {
                throw new Error("Error: " + response.status);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className={styles.DealList}>
            {products.map((item) => (
                <DealItems
                    key={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    rating={item.ratings}
                />
            ))}
        </div>
    );
};
