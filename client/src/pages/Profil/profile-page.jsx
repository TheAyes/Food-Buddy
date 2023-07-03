import styles from "./profile-page.module.scss";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";

export const ProfilePage = () => {
	return (
		<div className={styles.profilePage}>
			<header>
				<div>
					<GoBackButton />
					<p>Profile</p>
				</div>
			</header>
			<NavBar />
		</div>
	);
};
