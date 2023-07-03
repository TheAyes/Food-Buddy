import { Link } from "react-router-dom";
import styles from "./landPageTwo.module.scss"
import logoGreen from "../../pics/logoGreen.svg"

export const LandPageTwo = () => {

    return <main className={styles.landPageTwo}>
        <div>
            <img src={logoGreen} alt="app logo" />
            <h1>FoodBuddy</h1>
        </div>
        <article>
            <h2>Welcome to FoodBuddy</h2>
            <p>the place where culinary adventures begin!</p>
        </article>
        <section>
            <Link to="/register" >Create New Account</Link>
            <Link to="/login" >Sign In Your Account</Link>
        </section>
    </main>;
};
