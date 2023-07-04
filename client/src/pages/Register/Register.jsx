import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.scss";
import success from "../../pics/success.png";
import shadow from "../../pics/Shadow.svg";

export const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
			setRegistrationSuccess(true);

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
		<div className={styles.register}>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<div className={styles.checkLogo}>
							<img src={success} alt="check" />
							<img src={shadow} alt="shadow" />
						</div>
						<h2>
							<span className={styles.FoodBuddy}>Welcome</span> FoodBuddy
						</h2>
						<p>Successfully create your FoodBuddy account</p>
					</div>
				</div>
			)}
			<div
				className={`${styles.formBox} 
			${registrationSuccess ? styles.hidden : ""}`}
				style={{ display: registrationSuccess ? "none" : "" }}
			>
				<div className={styles.formValue}>
					<h2>Create New Account</h2>
					<h6>Enter your details to create account</h6>
					<form className={styles.form} onSubmit={handleRegister}>
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

