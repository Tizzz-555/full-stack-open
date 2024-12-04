import loginService from "../services/login";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Login = (props) => {
  const dispatch = useDispatch();
  const {
    setUser,
    username,
    setUsername,
    password,
    setPassword,
    setOkMessage,
    setErrorMessage,
  } = props;

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
      dispatch(
        setNotification(`User ${username} successfully logged in`, 2, false)
      );

      setUsername("");
      setPassword("");
    } catch (e) {
      dispatch(setNotification("Wrong username or password", 2, true));
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
