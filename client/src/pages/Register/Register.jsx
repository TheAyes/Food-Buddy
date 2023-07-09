import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.scss";
import success from "../../pics/success.png";
import shadow from "../../pics/Shadow.svg";
import { UserContext } from "../../app.jsx";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

	const userState = useContext(UserContext);

	const handleRegister = (event) => {
		event.preventDefault();
		(async () => {
			try {
				const response = await axios.post("/api/user/register", {
					username: username,
					password: password,
					email: email
				});
				localStorage.setItem("access-token", response.data.accessToken);
				localStorage.setItem("refresh-token", response.data.refreshToken);

				userState.set({
					accessToken: response.data.accessToken,
					refreshToken: response.data.refreshToken
				});

				setUsername("");
				setPassword("");
				setEmail("");
				setShowModal(true);
				setRegistrationSuccess(true);

				setTimeout(() => {
					setShowModal(false);
					window.location.href = "/home";
				}, 2000);
			} catch (error) {
				console.error(error.response.data);
				//display error message
			}
		})();
	};

	return (
		<div className={styles.register}>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.checkLogo}>
						<img src={success} alt="check" />
						<img src={shadow} alt="shadow" />
					</div>
					<h2>
						<span className={styles.FoodBuddy}>Welcome</span> FoodBuddy
					</h2>
					<p>Successfully create your FoodBuddy account</p>
				</div>
			)}
			<div className={styles.formBox} style={{ display: registrationSuccess ? "none" : "" }}>
				<div>
					<h2>Create New Account</h2>
					<h6>Enter your details to create account</h6>
					<form onSubmit={handleRegister}>
						<div className={styles.inputbox}>
							<label>Username</label>
							<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
						</div>
						<div className={styles.inputbox}>
							<label>Email</label>
							<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className={styles.inputbox}>
							<label>Password</label>
							<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
					</form>
					<button className={styles.button} onClick={handleRegister}>
						Sign up
					</button>
				</div>
			</div>
			<div className={styles.alreadyHaveAccount}>
				<p className={styles.pTag}>
					Already Have Account?{" "}
					<Link to="/login" className={styles.linkLogin}>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
};

