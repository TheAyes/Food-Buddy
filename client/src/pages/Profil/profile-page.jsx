import styles from "./profile-page.module.scss";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";

export const ProfilePage = () => {
	return (
		<div className={styles.profilePage}>
			<header>
				<article>
					<GoBackButton />
					<p>Profile</p>
				</article>
				<figure>
					<img src="https://source.unsplash.com/random" alt="image" />
					<button onClick={handleEditProfilePicture}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="48"
							viewBox="0 -960 960 960"
							width="48"
							fill="currentColor"
						>
							<path d="M187-179h32l435-437-32-32-435 437v32Zm610-479L665-790l21-22q28-28 66.5-28.5T819-814l18 18q23 22 20.5 51T835-696l-38 38Zm-41 41L247-108H115v-132l508-508 133 131Zm-117-15-17-16 32 32-15-16Z" />
						</svg>
					</button>
				</figure>
			</header>
			<NavBar />
		</div>
	);
};
