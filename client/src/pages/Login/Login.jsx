import React, { useState } from "react";
import styles from "./Login.module.scss";
import logo from "../../pics/LogoGreen.svg";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	// useEffect(() => {
	// 	handleLogin();
	// }, [username, password]);

	const handleLogin = () => {
		// 	axios
		// 		.post("/api/user/login", {
		// 			username: username,
		// 			password: password
		// 		})
		// 		.then((response) => {
		// 			console.log(response.data);
		// 		})
		// 		.catch((error) => {
		// 			console.error(error);
		// 		});
	};

	return (
		<>
			<div className={styles.login}>
				<img src={logo} alt="logo" />
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
				<button onClick={handleLogin}>Login</button>
			</div>
		</>
	);
};
