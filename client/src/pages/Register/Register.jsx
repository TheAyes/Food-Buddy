import React, { useState } from "react";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const handleRegister = () => {
		//Hier der Code für die Registrierung
	};

	return (
		<div>
			<h1>Create New Account</h1>
			<h2>Enter your details to create account</h2>
			<form action="login" className={styles.form}>
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
		</div>
	);
};

