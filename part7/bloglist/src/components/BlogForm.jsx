import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const dispatch = useDispatch();
  const addBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    e.target.title.value = "";
    e.target.author.value = "";
    e.target.url.value = "";
    const blog = { title, author, url };

    const result = await dispatch(createBlog(blog));
    if (result.success) {
      dispatch(
        setNotification(
          `A new blog ${result.blog.title} by ${result.blog.author} added`,
          2,
          false
        )
      );
    } else {
      dispatch(setNotification(result.error, 2, true));
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
