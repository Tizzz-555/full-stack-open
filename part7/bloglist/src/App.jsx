import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { fetchBlogs } from "./reducers/blogReducer";
import { createSelector } from "@reduxjs/toolkit";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const selectSortedBlogs = createSelector([(state) => state.blogs], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
);

const App = () => {
  const dispatch = useDispatch();

  const blogs = useSelector(selectSortedBlogs);
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

  const addLikeTo = async (blogObject) => {
    const id = blogObject.id;
    const updatedBlog = { ...blogObject, likes: blogObject.likes + 1 };
    const returnedBlog = await blogService.updateBlog(id, updatedBlog);
    setBlogs(
      blogs
        .map((blog) => (blog.id !== id ? blog : returnedBlog))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const deleteABlog = async (id) => {
    const blogToDelete = blogs.find((b) => b.id === id);

    if (
      window.confirm(
        `Remove '${blogToDelete.title}' by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
        dispatch(setNotification(`Deleted ${blogToDelete.title}`, 2, false));
      } catch (error) {
        console.error("Error deleting the blog:", error);
        dispatch(
          setNotification(
            error?.response?.data?.error ||
              "An error occurred while deleting the blog",
            2,
            true
          )
        );
      }
    }
  };

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
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={() => addLikeTo(blog)}
          removeBlog={() => deleteABlog(blog.id)}
          deletable={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default App;
