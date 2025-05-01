import { createBlog, fetchBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button, TextField, Paper } from "@mui/material";

const BlogForm = ({ dispatch, toggleVisibility }) => {
  const formLayout = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const addBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.title.value = "";
    e.target.author.value = "";
    e.target.url.value = "";
    const blog = { title, author, url };

    try {
      await dispatch(createBlog(blog));
      dispatch(
        setNotification(
          `A new blog ${blog.title} by ${blog.author} added`,
          2,
          true
        )
      );
      dispatch(fetchBlogs());
    } catch (error) {
      dispatch(
        setNotification(
          error?.response?.data?.error ||
            "An error occurred while adding the blog",
          2,
          false
        )
      );
    }
  };

  return (
    <div style={formLayout}>
      <Paper
        sx={{
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <h2>Create new</h2>
        <form
          onSubmit={addBlog}
          style={{
            display: "flex",
            flexDirection: "inherit",
            alignItems: "center",
            padding: 10,
            gap: 3,
          }}
        >
          <div>
            <TextField
              data-testid="title"
              name="title"
              id="formTitle"
              placeholder="Title"
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              data-testid="author"
              name="author"
              id="formAuthor"
              placeholder="Author"
              sx={{ margin: 1 }}
            />
          </div>
          <div>
            <TextField
              data-testid="url"
              name="url"
              id="formUrl"
              placeholder="Url"
              sx={{ margin: 1 }}
            />
          </div>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button
              sx={{
                width: "40%",
              }}
              variant="outlined"
              onClick={toggleVisibility}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "40%",
              }}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default BlogForm;
