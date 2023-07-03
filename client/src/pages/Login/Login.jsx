import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import logo from "../../pics/LogoGreen.svg";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		handleLogin();
	}, [username, password]);

	const handleLogin = () => {
		axios
			.post("/api/user/login", {
				username: username,
				password: password
			})
			.then((response) => {
				console.log(response.data);
				setShowModal(true);
				setTimeout(() => {
					setShowModal(false);
					window.location.href = "/home";
				}, 5000);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<>
			<div className={styles.login}>
				<img src={logo} alt="logo" />
				<form className={styles.form}>
					<div>
						<p>Email</p>
						<input
							type="text"
							placeholder="Email adress.."
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<p>Password</p>
						<input
							type="password"
							placeholder="Your Password.."
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</form>
				<button onClick={handleLogin}>Login</button>
				{showModal && (
					<div className={styles.modal}>
						<h3>Successful Login!</h3>
					</div>
				)}
				;
			</div>
		</>
	);
};

