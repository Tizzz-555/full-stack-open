import { useState } from "react";
import PropTypes from "prop-types";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const selectSortedBlogs = createSelector([(state) => state.blogs], (blogs) =>
  [...blogs].sort((a, b) => b.likes - a.likes)
);

const Blog = ({ blog, addLike, removeBlog, deletable }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div data-testid="header" id="header">
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <button
          className="showButton"
          onClick={() => setDetailsVisible(!detailsVisible)}
        >
          {detailsVisible ? "Hide" : "View"}
        </button>
      </div>
      <div data-testid="details" id="details" style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes}
          <button id="likeButton" onClick={addLike}>
            Like
          </button>
        </div>
        <div>{blog.user.username}</div>
        {deletable && (
          <button className="deleteButton" onClick={removeBlog}>
            Remove blog
          </button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  deletable: PropTypes.bool.isRequired,
};

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectSortedBlogs);

  const like = (blog) => {
    const id = blog.id;
    dispatch(likeBlog(blog));
    const blogToVote = blogs.find((b) => b.id === id);
    dispatch(setNotification(`you voted "${blogToVote.title}"`, 2, true));
  };

  const remove = async (blog) => {
    const id = blog.id;
    const result = await dispatch(deleteBlog(id));
    if (result.success && id === result.id) {
      dispatch(setNotification(`Deleted ${blog.title} blog`, 2, true));
    } else {
      dispatch(setNotification(result.error, 2, false));
    }
  };

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={() => remove(blog)}
            addLike={() => like(blog)}
            deletable={user.username === blog.user.username}
          />
        );
      })}
    </div>
  );
};
export default BlogList;
