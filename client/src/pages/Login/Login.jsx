import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import logo from "../../pics/LogoGreen.svg";
import success from "../../pics/success.png";
import shadow from "../../pics/Shadow.svg";
import { UserContext } from "../../app.jsx";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState(false);

	const userState = useContext(UserContext);

	const handleLogin = (event) => {
		event.preventDefault();
		try {
			(async () => {
				const response = await axios.post("/api/user/login", {
					username: username.toLowerCase(),
					password: password
				});

				localStorage.setItem("access-token", response.data.accessToken);
				localStorage.setItem("refresh-token", response.data.refreshToken);

				userState.set({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken
				});

				setShowModal(true);
				setLoginSuccess(true);

				setTimeout(() => {
					setShowModal(false);
					window.location.href = "/home";
				}, 2000);
			})();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.login}>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.checkLogo}>
						<img src={success} alt="check" />
						<img src={shadow} alt="shadow" />
					</div>
					<h3>Successful Login!</h3>
				</div>
			)}
			<div className={styles.formBox} style={{ display: loginSuccess ? "none" : "" }}>
				<div>
					<img src={logo} alt="logo" />
					<h1>
						<span className={styles.headline}>Food</span>Buddy
					</h1>
					<form className={styles.form} onSubmit={handleLogin}>
						<label className={styles.inputbox}>
							<p>Username</p>
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</label>

						<label className={styles.inputbox}>
							<p>Password</p>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</label>

						<label className={styles.forget}>
							<input type="checkbox" />
							Remember Me <Link to="#">Forget Password</Link>
						</label>

						<button type="submit" className={styles.button} onClick={handleLogin}>
							Login
						</button>
					</form>
				</div>
			</div>
			<div className={styles.dontHaveAccount}>
				<p className={styles.pTag}>
					Don't Have Account?{" "}
					<Link to="/register" className={styles.linkRegister}>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
};

