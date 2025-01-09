import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import { setUser } from "./reducers/userReducer";
import { fetchUsers } from "./reducers/usersListReducer";
import UsersList from "./components/UsersList";
import User from "./components/User";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersList);
  const loggedUser = useSelector((state) => state.user);
  const blogFormRef = useRef();

  const match = useMatch("/users/:id");
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(storedUser));
      blogService.setToken(storedUser.token);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBlogs());
    dispatch(fetchUsers());
  }, [dispatch]);

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setUser(null));
  };

  if (loggedUser === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <Login />
      </>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {loggedUser.name} logged in
        <button onClick={logoutUser}>Logout</button>
      </p>
      <Routes>
        <Route path="/users" element={<UsersList users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <BlogList user={loggedUser} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
