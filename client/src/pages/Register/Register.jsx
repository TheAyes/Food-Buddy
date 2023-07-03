import React, { useState } from "react";
import axios from "axios";
import styles from "./Register.module.scss";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [showModal, setShowModal] = useState(false);

	const handleRegister = async () => {
		try {
			const response = await axios.post("/api/user/register", {
				username: username,
				password: password,
				email: email
			});
			console.log(response.data);
			localStorage.setItem("auth-token", JSON.stringify(response.data));
			setUsername("");
			setPassword("");
			setEmail(""); //Weiterleitung oder Anzeige einer Erfolgsmeldug
			setShowModal(true);

			setTimeout(() => {
				setShowModal(false);
				window.location.href = "/home";
			}, 5000);
		} catch (error) {
			console.error(error.response.data);
			//Anzeige einer Fehlermeldung
		}
	};

	return (
		<div>
			<h1>Create New Account</h1>
			<h2>Enter your details to create account</h2>
			<form className={styles.form} onSubmit={handleRegister}>
				<div>
					<p>Username</p>
					<input
						type="text"
						placeholder="Choose Username.."
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<p>Email</p>
					<input
						type="text"
						placeholder="Your Email Adress.."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
			<button onClick={handleRegister}>Sign up</button>
			{showModal && (
				<div className="modal">
					<div className="modal-content">
						<h2>Welcome FoodBuddy</h2>
						<p>Successfully create your FoodBuddy account</p>
					</div>
				</div>
			)}
		</div>
	);
};

