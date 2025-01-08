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

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { UsersList } from "./components/UsersList";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

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

  if (user === null) {
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
        {user.name} logged in
        <button onClick={logoutUser}>Logout</button>
      </p>
      <Routes>
        <Route path="/users" element={<UsersList />} />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm />
              </Togglable>
              <BlogList user={user} />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
