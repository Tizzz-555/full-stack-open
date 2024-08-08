import { useState } from "react";

const Blog = ({ blog }) => {
	const [detailsVisible, setDetailsVisible] = useState(false);
	console.log(blog);
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
			<div id="header">
				{blog.title} {blog.author}
				<button onClick={() => setDetailsVisible(!detailsVisible)}>
					{detailsVisible ? "Hide" : "View"}
				</button>
			</div>
			<div id="details" style={showWhenVisible}>
				<div>{blog.url}</div>
				<div>
					likes: {blog.likes}
					<button>Like</button>
				</div>
				<div>{blog.user.username}</div>
			</div>
		</div>
	);
};

export default Blog;
