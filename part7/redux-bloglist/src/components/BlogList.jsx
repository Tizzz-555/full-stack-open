import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div data-testid="header" id="header">
        <Link to={`/blogs/${blog.id}`}>
          <div>
            {blog.title} - {blog.author}
          </div>
        </Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </div>
  );
};
export default BlogList;
