import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import blogService from "../services/blogs";
import {
	useNotificationDispatch,
	setNotification,
} from "../NotificationContext";

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
	const dispatch = useNotificationDispatch();
	const queryClient = useQueryClient();

	// 	setNotification(dispatch, `you voted "${returnedBlog.title}"`, true, 5);

	const updateBlogMutation = useMutation({
		mutationFn: blogService.updateBlog,
		onSuccess: (returnedBlog) => {
			setNotification(dispatch, `you voted "${returnedBlog.title}"`, true, 5);
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
		},
		onError: (blogError) => {
			const errorMessage =
				blogError.response?.data?.error ||
				blogError.message ||
				"An unknown error occurred";
			setNotification(dispatch, errorMessage, false, 5);
		},
	});

	const deleteBlogMutation = useMutation({
		mutationFn: blogService.deleteBlog,
		onSuccess: (returnedBlog) => {
			setNotification(dispatch, `Deleted ${returnedBlog.title} blog`, true, 5);
			queryClient.invalidateQueries({ queryKey: ["blogs"] });
		},
		onError: (blogError) => {
			console.log(blogError);
			const errorMessage =
				blogError.response?.data?.error ||
				blogError.message ||
				"An error occurred while deleting the blog";
			setNotification(dispatch, errorMessage, false, 5);
		},
	});

	const like = (blog) => {
		const id = blog.id;
		const updatedBlog = { ...blog, likes: blog.likes + 1 };
		updateBlogMutation.mutate({ id, newObject: updatedBlog });
	};

	const remove = async (blog) => {
		if (window.confirm(`Are you sure you want to delete "${blog.title} ?"`)) {
			deleteBlogMutation.mutate(blog);
		}
	};

	const result = useQuery({
		queryKey: ["blogs"],
		queryFn: blogService.getAll,
		refetchOnWindowFocus: false,
		retry: 1,
	});

	if (result.isLoading) {
		return <div>loading data...</div>;
	}

	if (result.isError) {
		return <div>blog service not available due to problems in server</div>;
	}

	const blogs = result.data.sort((a, b) => b.likes - a.likes);

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
