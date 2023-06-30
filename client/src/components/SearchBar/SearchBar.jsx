import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import search from "../../pics/suche.png";
import styles from "./SearchBar.module.scss";
import data from "../../data/grocery-data.json";

export const SearchBar = ({ onSelectItem }) => {
	const [input, setInput] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const inputRef = useRef(null);

	// Searchbar mit api verbunden, aktuell auf ItemList ausgerichtet - Autosuggestions und filter für die Ausgabe der Items
	const handleChange = (value) => {
		setInput(value);
		const filteredItems = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
		setFilteredData(filteredItems);
		setSuggestions(filteredItems.slice(0, 10));
	};

	const handleItemClick = (item) => {
		setInput(item.name);
		setFilteredData([item]);
		setSuggestions([]);
		onSelectItem(item);
	};

	const handleSearch = async () => {
		try {
			const response = await fetch(`/api/products?name=${input}`);
			const data = await response.json();
			setFilteredData(data);
			setSuggestions([]);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick = () => {
		handleSearch();
		if (filteredData.length > 0) {
			onSelectItem(filteredData[0]);
		}
	};

	useEffect(() => {
		if (suggestions.length > 0) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [suggestions]);

	const handleClickOutside = (event) => {
		if (inputRef.current && !inputRef.current.contains(event.target)) {
			setSuggestions([]);
		}
	};

	return (
		<>
			<div className={styles.SearchBarParent}>
				<div className={styles.inputWrapper}>
					<img src={search} alt="search" onClick={handleClick} />
					<input
						type="text"
						placeholder="Search for Product..."
						value={input}
						onChange={(e) => handleChange(e.target.value)}
					/>
				</div>
				{suggestions.length > 0 && (
					<ul className={styles.suggestions}>
						{suggestions.map((item) => (
							<li key={item.id} onClick={() => handleItemClick(item)} className={styles.suggestionItem}>
								<span className={styles.bold}>{item.name.slice(0, input.length)}</span>
								{item.name.slice(input.length)}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

