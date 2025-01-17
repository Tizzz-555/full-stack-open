import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import blogService from "../services/blogs";

const BlogView = ({ blog, dispatch, deletable }) => {
  const navigate = useNavigate();
  if (!blog) {
    return null;
  }
  const id = blog.id;
  const like = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(id, likedBlog));
    dispatch(setNotification(`you voted "${blog.title}"`, 2, true));
  };

  const comment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    dispatch(commentBlog(id, { comment: comment }));
    dispatch(setNotification(`"${comment}" comment added`, 2, true));
    e.target.comment.value = "";
  };
  const remove = () => {
    try {
      dispatch(deleteBlog(id));
      dispatch(setNotification(`Deleted ${blog.title} blog`, 2, true));
      navigate("/");
    } catch (error) {
      dispatch(setNotification(result.error, 2, false));
    }
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}
        <button id="likeButton" onClick={like}>
          Like
        </button>
      </div>
      <div data-testid="details" id="details">
        <div>added by {blog.user.username}</div>
        {deletable && (
          <button className="deleteButton" onClick={remove}>
            Remove blog
          </button>
        )}
      </div>
      <h2>Comments</h2>
      <form onSubmit={comment}>
        <input name="comment" placeholder="add comment"></input>
        <button>Submit</button>
      </form>
      {blog.comments && (
        // <>
        <ul>
          {blog.comments.map((c, index) => (
            <li key={index}>{c}</li>
          ))}
        </ul>
        // </>
      )}
    </div>
  );
};

export default BlogView;
