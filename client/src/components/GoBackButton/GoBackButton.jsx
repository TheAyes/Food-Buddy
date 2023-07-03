import { useNavigate } from "react-router-dom";
import styles from "./GoBackButton.module.scss";

// Bild Import
import goBack from "../../pics/goBackButton.svg";

export const GoBackButton = () => {
	const navigate = useNavigate();

	return (
		<>
			<img className={styles.goBackButton} src={goBack} alt="back Button" onClick={() => navigate(-1)} />
		</>
	);
	return (
		<button>
			<img className={styles.goBackButton} src={goBack} alt="back Button" onClick={() => navigate(-1)} />
		</button>
	);
};
