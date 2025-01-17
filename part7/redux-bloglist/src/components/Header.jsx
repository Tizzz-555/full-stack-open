import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const Header = ({ user, dispatch, setUser }) => {
  const navigate = useNavigate();

  const header = {
    padding: 10,
    backgroundColor: "lightgray",
    display: "flex",
    gap: "5px",
  };

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <div>
      <div style={header}>
        <Link to="/">blogs</Link>
        <Link to="/users">users</Link>
        <div>
          {user.name} logged in
          <button onClick={logoutUser}>Logout</button>
        </div>
      </div>
      <h2>Blog app</h2>
    </div>
  );
};

export default Header;
