import styles from "./profile-page.module.scss";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const ProfilePage = () => {
	const formRef = useRef(null);

	const [isEditing, setIsEditing] = useState(false);
	const [userInfo, setUserInfo] = useState({
		username: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		address: {
			street: "",
			streetNumber: 0,
			zipCode: 0,
			city: "",
			country: ""
		}
	});

	useEffect(() => {
		(async () => {
			if (!isEditing) {
				setIsEditing(true);
			} else {
				const { data } = {
					data: {
						username: "Justin",
						fullName: "Justin Schildt",
						email: "justinsupercode@gmail.com",
						phoneNumber: "0123 456 789",
						address: {
							street: "Beispielstraße",
							streetNumber: 29,
							zipCode: 49919,
							city: "Bad Laer",
							country: "Germany"
						}
					}
				}; //await axios.patch("/api/user"}); AUTHORIZATION NIT VERJESSEN
				setUserInfo(data);
			}
		})();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		(async () => {
			if (!isEditing) {
				setIsEditing(true);
			} else {
				const formData = new FormData(formRef.current);
				const data = Object.fromEntries(formData.entries());

				const { data: updatedData } = await axios.patch("/api/user", data, {
					headers: {
						Authorization: `Bearer ${null}`
					}
				});

				setUserInfo((e) => {
					return { ...e, username: "" };
				});

				/* How to authorize
				await axios.patch(
					"/api/user",
					{},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);*/

				setUserInfo(data);
			}
		})();
	};

	const handleEditProfilePicture = () => {
		console.log("Hey");
	};
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
			<form onSubmit={handleSubmit} ref={formRef}>
				<fieldset>
					<legend>About you</legend>
					<label>
						<p>Username</p>
						<input type="text" placeholder="Username" disabled={!isEditing} />
					</label>
					<label>
						<p>Full name</p>
						<input type="text" placeholder="Full name" disabled={!isEditing} />
					</label>
				</fieldset>

				<fieldset id="contact-field">
					<legend>Contact</legend>
					<label>
						<p>Email</p>
						<input type="text" placeholder="Your@email.com" disabled={!isEditing} />
					</label>
					<label>
						<p>Phone Number</p>
						<input type="text" placeholder="0123 456 789" disabled={!isEditing} />
					</label>
				</fieldset>

				<fieldset className={styles.address}>
					<legend>Address</legend>
					<label style={{ gridColumn: "1 / 4" }}>
						<p>Street</p>
						<input type="text" placeholder="Street" disabled={!isEditing} />
					</label>
					<label style={{ gridColumn: "4 / 5" }}>
						<p>Street Number</p>
						<input type="number" placeholder="10" disabled={!isEditing} />
					</label>
					<label style={{ gridColumn: "1 / 2" }}>
						<p>Zip Code</p>
						<input type="number" placeholder="12345" maxLength={5} disabled={!isEditing} />
					</label>
					<label style={{ gridColumn: "2 / 3" }}>
						<p>City</p>
						<input type="text" placeholder="City" disabled={!isEditing} />
					</label>
					<label style={{ gridColumn: "3 / 5" }}>
						<p>Country</p>
						<select defaultValue="Germany" placeholder="Country" disabled={!isEditing}>
							<option>Germany</option>
							<option>United States</option>
							<option>China</option>
							<option>India</option>
							<option>United Kingdom</option>
							<option>France</option>
							<option>Canada</option>
							<option>Australia</option>
							<option>Russia</option>
							<option>Brazil</option>
							<option>Japan</option>
							<option>South Africa</option>
							<option>Spain</option>
							<option>Italy</option>
							<option>Mexico</option>
							<option>South Korea</option>
							<option>Indonesia</option>
							<option>Argentina</option>
						</select>
					</label>
				</fieldset>
				<section>
					{isEditing ? (
						<fieldset>
							<input type="submit" value="Confirm Information" />
							<input type="button" value="Cancel" />
						</fieldset>
					) : (
						<input type="submit" value="Edit Information" />
					)}
				</section>
			</form>
			<NavBar />
		</div>
	);
};
