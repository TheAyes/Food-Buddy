import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import logo from "../../pics/LogoGreen.svg";
import success from "../../pics/success.png";
import shadow from "../../pics/Shadow.svg";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [loginSuccess, setLoginSuccess] = useState(false);

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
					setLoginSuccess(true);
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
		<div className={styles.login}>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.checkLogo}>
							<img src={success} alt="check" />
							<img src={shadow} alt="shadow" />
						</div>
						<h3>Successful Login!</h3>
					</div>
				</div>
			)}
			<div
				className={`${styles.formBox} 
                ${loginSuccess ? styles.hidden : ""}`}
				style={{ display: loginSuccess ? "none" : "" }}
			>
				<div className={styles.formValue}>
					<img src={logo} alt="logo" />
					<h1>
						<span className={styles.headline}>Food</span>Buddy
					</h1>
					<form className={styles.form} onSubmit={handleLogin}>
						<div className={styles.inputbox}>
							<label>Username</label>
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</div>
						<div className={styles.inputbox}>
							<label>Password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<div className={styles.forget}>
							<label>
								<input type="checkbox" />
								Remember Me <Link>Forget Password</Link>
							</label>
						</div>
					</form>
					<button className={styles.button} onClick={handleLogin}>
						Login
					</button>
				</div>
			</div>
			<div className={styles.dontHaveAccount}>
				<p className={styles.pTag}>
					Already Have Account?{" "}
					<Link to="/register" className={styles.linkLogin}>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};
