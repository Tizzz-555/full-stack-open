import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

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
import UserView from "./components/User";
import BlogView from "./components/BlogView";
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";
import Header from "./components/Header";

const selectSortedBlogs = createSelector([(state) => state.blogs], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
);

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user);
  const users = useSelector((state) => state.usersList);
  const userMatch = useMatch("/users/:id");
  const matchedUser = userMatch
    ? users.find((u) => u.id === userMatch.params.id)
    : null;

  const blogFormRef = useRef();
  const blogs = useSelector(selectSortedBlogs);
  const blogMatch = useMatch("/blogs/:id");
  const matchedBlog = blogMatch
    ? blogs.find((b) => b.id === blogMatch.params.id)
    : null;

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
      <Notification />
      <Header user={loggedUser} dispatch={dispatch} setUser={setUser} />
      <Routes>
        <Route path="/users" element={<UsersList users={users} />} />
        <Route path="/users/:id" element={<UserView user={matchedUser} />} />
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
                <BlogForm
                  toggleVisibility={() =>
                    blogFormRef.current.toggleVisibility()
                  }
                  dispatch={dispatch}
                />
              </Togglable>
              <BlogList user={loggedUser} blogs={blogs} />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blog={matchedBlog}
              dispatch={dispatch}
              deletable={loggedUser.username === matchedBlog?.user.username}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
