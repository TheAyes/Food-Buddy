import Logo from "../../pics/LogoWhite.svg";
import styles from "./GrünerBalken.module.scss";

const GrünerBalken = () => {
	return (
		<div className={styles.grünerBalken_container}>
			<img src={Logo} alt="logo" />
		</div>
	);
};

export default GrünerBalken;

