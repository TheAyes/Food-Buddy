import React, { useState } from "react";
import styles from "./Login.module.scss";
import logo from "../../pics/logoInGreen.png";

export const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {};

	return (
		<>
			<div>
				<img src={logo} alt="logo" />
			</div>
		</>
	);
};

