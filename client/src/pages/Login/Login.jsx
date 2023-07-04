import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Login.module.scss";
import logo from "../../pics/LogoGreen.svg";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);

	const handleLogin = (event) => {
		event.preventDefault();
		try {
			axios
				.post("/api/user/login", {
					username: username.toLowerCase(),
					password: password
				})
				.then((response) => {
					console.log(response);
					localStorage.setItem("auth-token", JSON.stringify(response.data));
					setShowModal(true);
					setTimeout(() => {
						setShowModal(false);
						window.location.href = "/home";
					}, 5000);
				})
				.catch((error) => {
					console.error(error);
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className={styles.login}>
				<img src={logo} alt="logo" />
				<h1>
					<span className={styles.headline}>Food</span>Buddy
				</h1>
				<form className={styles.form} onSubmit={handleLogin}>
					<div>
						<p>Username</p>
						<input
							type="text"
							placeholder="Username"
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
					<input type="submit" value="Login" />
					{/* // hier evtl bei Fehlermeldungen den button wieder
					einen runter packen */}
				</form>
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

