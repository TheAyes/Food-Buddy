import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import search from "../../pics/suche.png";
import styles from "./SearchBar.module.scss";
import data from "../../data/grocery-data.json";

export const SearchBar = ({ onSelectItem }) => {
	const [input, setInput] = useState("");
	const [filteredData, setFilteredData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	// IST-STAND: Funktion für Daten aus json.Datei --> hinterher fetch mit API - Code umschreiben und anpassen -> bisher nur Optik und die gesuchten Produkte werden in der Konsole ausgespielt
	const handleChange = (value) => {
		setInput(value);
		const filteredItems = data.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
		setFilteredData(filteredItems);
		setSuggestions(filteredItems.slice(0, 10));
	};

	const handleItemClick = (item) => {
		// const updatedInput = item.name;
		setInput(item.name);
		setFilteredData([item]);
		setSuggestions([]);
		onSelectItem(item);
	};

	const handleSearch = () => {
		const filteredItems = data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
		setFilteredData(filteredItems);
		setSuggestions([]);
	};

	const handleClick = () => {
		handleSearch();
		if (filteredData.length > 0) {
			onSelectItem(filteredData[0]);
		}
	};

	useEffect(() => {
		const filteredItems = data.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()));
		setFilteredData(filteredItems);
	}, [input]);

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

