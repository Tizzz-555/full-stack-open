import loginService from "../services/login";
import blogService from "../services/blogs";
import {
	useNotificationDispatch,
	setNotification,
} from "../NotificationContext";

const Login = (props) => {
	const dispatch = useNotificationDispatch();

	const { setUser, username, setUsername, password, setPassword } = props;

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setNotification(
				dispatch,
				`User ${username} successfully logged in`,
				true,
				5
			);
			setUsername("");
			setPassword("");
		} catch (e) {
			setNotification(dispatch, "Wrong username or password", false, 5);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				username
				<input
					data-testid="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					data-testid="password"
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
