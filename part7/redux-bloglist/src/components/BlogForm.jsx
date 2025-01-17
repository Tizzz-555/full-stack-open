import { useDispatch } from "react-redux";
import { createBlog, fetchBlogs } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = ({ dispatch }) => {
  // const dispatch = useDispatch();
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
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:{" "}
          <input
            data-testid="title"
            name="title"
            id="formTitle"
            placeholder="The post title"
          />
        </div>
        <div>
          Author:{" "}
          <input
            data-testid="author"
            name="author"
            id="formAuthor"
            placeholder="The post author"
          />
        </div>
        <div>
          Url:{" "}
          <input
            data-testid="url"
            name="url"
            id="formUrl"
            placeholder="The post link"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
