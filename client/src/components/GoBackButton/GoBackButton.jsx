import { useNavigate } from "react-router-dom";
import styles from "./GoBackButton.module.scss";

// Bild Import

export const GoBackButton = () => {
	const navigate = useNavigate();

	return (
		<button className={styles.goBackButton} onClick={() => navigate(-1)}>
		</button>
	);
};
