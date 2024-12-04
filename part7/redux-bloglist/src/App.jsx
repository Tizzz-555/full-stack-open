import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  const logoutUser = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />

        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          user={user}
          setUser={setUser}
        />
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
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default App;
