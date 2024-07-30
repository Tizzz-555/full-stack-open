import { useState, useEffect } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = (props) => {
	const { user, setUser, username, setUsername, password, setPassword } = props;

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			blogService.setToken(user.token);
			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (e) {
			alert("wrong credentials");
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};

export default Login;
