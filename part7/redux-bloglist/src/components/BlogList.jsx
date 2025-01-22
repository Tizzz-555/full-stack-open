import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Grid2, Paper } from "@mui/material";

const Blog = ({ blog }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <Grid2 size={4}>
      <Item size={4} data-testid="header" id="header">
        <Link to={`/blogs/${blog.id}`}>
          <div>
            {blog.title} - {blog.author}
          </div>
        </Link>
      </Item>
    </Grid2>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

const BlogList = ({ blogs }) => {
  return (
    <Grid2 container spacing={2}>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} />;
      })}
    </Grid2>
  );
};
export default BlogList;
