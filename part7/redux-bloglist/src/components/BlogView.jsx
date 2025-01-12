import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";

const BlogView = ({ blog, dispatch, deletable }) => {
  console.log(blog);
  const navigate = useNavigate();
  if (!blog) {
    return null;
  }

  const like = (blog) => {
    dispatch(likeBlog(blog));
    dispatch(setNotification(`you voted "${blog.title}"`, 2, true));
  };

  const remove = async (blog) => {
    const id = blog.id;
    const result = await dispatch(deleteBlog(id));
    if (result.success && id === result.id) {
      dispatch(setNotification(`Deleted ${blog.title} blog`, 2, true));
    } else {
      dispatch(setNotification(result.error, 2, false));
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}
        <button id="likeButton" onClick={() => like(blog)}>
          Like
        </button>
      </div>
      <div data-testid="details" id="details">
        <div>added by {blog.user.username}</div>
        {deletable && (
          <button className="deleteButton" onClick={() => remove(blog)}>
            Remove blog
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogView;
