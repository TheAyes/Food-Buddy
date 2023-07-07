import styles from "./profile-page.module.scss";
import { NavBar } from "../../components/NavBar/NavBar.jsx";
import { GoBackButton } from "../../components/GoBackButton/GoBackButton.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../app.jsx";

export const ProfilePage = () => {
	const userState = useContext(UserContext);

	const [isEditing, setIsEditing] = useState(false);

	const [initialState, setInitialState] = useState({
		username: "",
		fullName: "",
		email: "",
		phoneNumber: "",
		address: {
			street: "",
			streetNumber: "",
			zipCode: "",
			city: "",
			country: ""
		}
	});

	const [userInfo, setUserInfo] = useState(initialState);

	useEffect(() => {
		console.log(userState);
		(async () => {
			const { data } = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${userState.get.accessToken}`
				}
			});
			const { data } = await axios.post(
				"/api/user",
				{},
				{
					headers: {
						Authorization: `Bearer ${userState.get.accessToken}`
					}
				}
			);
			console.log("axios data:", data);
			setInitialState((prevState) => {
				return { ...prevState, ...data.user };
			});
		})();
	}, []);

	useEffect(() => {
		setUserInfo(initialState);
	}, [initialState]);

	const handleSubmit = (event) => {
		event.preventDefault();
		(async () => {
			if (!isEditing) {
				setIsEditing(true);
			} else {
				console.log("Info to update:", userInfo);
				const { data: updatedData } = await axios.patch("/api/user", userInfo, {
					headers: {
						Authorization: `Bearer ${userState.get.accessToken}`
					}
				});

				console.log("updatedData:", updatedData);

				setUserInfo((prevState) => {
					return {
						...prevState,
						...updatedData
					};
				});

				setIsEditing(false);
			}
		})();
	};

	const handleCancel = (event) => {
		event.preventDefault();
		(async () => {
			setUserInfo(initialState);
			setIsEditing(false);
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
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>About you</legend>
					<label>
						<p>Username</p>
						<input
							type="text"
							placeholder="Username"
							disabled={!isEditing}
							value={userInfo.username}
							onChange={(event) => setUserInfo({ ...userInfo, username: event.target.value })}
						/>
					</label>
					<label>
						<p>Full name</p>
						<input
							type="text"
							placeholder="Full name"
							disabled={!isEditing}
							value={userInfo.fullName}
							onChange={(event) => setUserInfo({ ...userInfo, fullName: event.target.value })}
						/>
					</label>
				</fieldset>

				<fieldset id="contact-field">
					<legend>Contact</legend>
					<label>
						<p>Email</p>
						<input
							type="text"
							placeholder="Your@email.com"
							disabled={!isEditing}
							value={userInfo.email}
							onChange={(event) => setUserInfo({ ...userInfo, email: event.target.value })}
						/>
					</label>
					<label>
						<p>Phone Number</p>
						<input
							type="tel"
							placeholder="0123 456 789"
							disabled={!isEditing}
							value={userInfo.phoneNumber}
							onChange={(event) => setUserInfo({ ...userInfo, phoneNumber: event.target.value })}
						/>
					</label>
				</fieldset>

				<fieldset className={styles.address}>
					<legend>Address</legend>
					<label style={{ gridColumn: "1 / 4" }}>
						<p>Street</p>
						<input
							type="text"
							placeholder="Street"
							disabled={!isEditing}
							value={userInfo.address.street}
							onChange={(event) =>
								setUserInfo((prevState) => {
									return {
										...prevState,
										address: {
											...prevState.address,
											street: String(event.target.value)
										}
									};
								})
							}
						/>
					</label>
					<label style={{ gridColumn: "4 / 5" }}>
						<p>Street Number</p>
						<input
							type="number"
							placeholder="10"
							disabled={!isEditing}
							value={userInfo.address.streetNumber}
							onChange={(event) =>
								setUserInfo((prevState) => {
									return {
										...prevState,
										address: {
											...prevState.address,
											streetNumber: String(event.target.value)
										}
									};
								})
							}
						/>
					</label>
					<label style={{ gridColumn: "1 / 2" }}>
						<p>Zip Code</p>
						<input
							type="number"
							placeholder="12345"
							maxLength={5}
							disabled={!isEditing}
							value={userInfo.address.zipCode}
							onChange={(event) =>
								setUserInfo((prevState) => {
									return {
										...prevState,
										address: {
											...prevState.address,
											zipCode: String(event.target.value)
										}
									};
								})
							}
						/>
					</label>
					<label style={{ gridColumn: "2 / 3" }}>
						<p>City</p>
						<input
							type="text"
							placeholder="City"
							disabled={!isEditing}
							value={userInfo.address.city}
							onChange={(event) =>
								setUserInfo((prevState) => {
									return {
										...prevState,
										address: {
											...prevState.address,
											city: String(event.target.value)
										}
									};
								})
							}
						/>
					</label>
					<label style={{ gridColumn: "3 / 5" }}>
						<p>Country</p>
						<select
							placeholder="Country"
							disabled={!isEditing}
							value={userInfo.address.country}
							onChange={(event) =>
								setUserInfo((prevState) => {
									return {
										...prevState,
										address: {
											...prevState.address,
											country: String(event.target.value)
										}
									};
								})
							}
						>
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
							<input type="button" value="Cancel" onClick={handleCancel} />
						</fieldset>
					) : (
						<fieldset>
							<input type="submit" value="Edit Information" />
						</fieldset>
					)}
				</section>
			</form>
			<NavBar />
		</div>
	);
};
