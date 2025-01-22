import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { Paper, Divider, Button, TextField } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const BlogView = ({ blog, dispatch, deletable }) => {
  const blogLayout = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
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
    <div style={blogLayout}>
      <Paper
        sx={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "20px",
          padding: "20px",
          gap: "5px",
        }}
      >
        <div
          data-testid="details"
          id="details"
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <h2>{blog.title}</h2>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes: {blog.likes}
            <ThumbUpIcon
              id="likeButton"
              onClick={like}
              style={{
                width: "0.7em",
                marginLeft: "5px",
                position: "relative",
                top: "1px",
                cursor: "pointer",
              }}
            >
              Like
            </ThumbUpIcon>
          </div>
          <div>added by {blog.user.username}</div>
          {deletable && (
            <Button variant="contained" onClick={remove}>
              Remove blog
            </Button>
          )}
        </div>
        <Divider sx={{ width: "100%", margin: "10px" }} />
        <h2>Comments</h2>
        <form onSubmit={comment} style={{ display: "flex", gap: "5px" }}>
          <TextField name="comment" placeholder="add comment"></TextField>
          <Button variant="contained" style={{ backgroundColor: "lightcoral" }}>
            Submit
          </Button>
        </form>
        {blog.comments && (
          <div style={{ width: "100%" }}>
            <ul>
              {blog.comments.map((c, index) => (
                <li key={index}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default BlogView;
