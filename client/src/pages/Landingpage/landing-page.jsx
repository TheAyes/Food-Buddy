import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./landingPage.module.scss";
import logoWhite from "../../pics/LogoWhite.svg";

export const LandingPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const redirectTimeout = setTimeout(() => {
			navigate("/landingpage/2");
		}, 3000);

		return () => clearTimeout(redirectTimeout);
	}, [navigate]);

	return (
		<main className={styles.landingPage}>
			<img src={logoWhite} alt="app logo" />
			<h1>FoodBuddy</h1>
		</main>
	);
};
