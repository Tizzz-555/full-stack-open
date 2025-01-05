import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { validateUser } from "../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const loggedUser = await dispatch(validateUser({ username, password }));

    if (loggedUser.success) {
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(loggedUser.user)
      );
      blogService.setToken(loggedUser.user.token);
      dispatch(
        setNotification(`User ${username} successfully logged in`, 2, true)
      );
    } else {
      dispatch(setNotification(loggedUser.error, 2, false));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input data-testid="username" type="text" name="username" />
      </div>
      <div>
        password
        <input data-testid="password" type="password" name="password" />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
