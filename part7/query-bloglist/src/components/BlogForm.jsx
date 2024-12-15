import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import {
	useNotificationDispatch,
	setNotification,
} from "../NotificationContext";

const BlogForm = () => {
	const queryClient = useQueryClient();
	const dispatch = useNotificationDispatch();

	const newBlogMutation = useMutation({
		mutationFn: blogService.createBlog,
		onSuccess: (newBlog) => {
			console.log(newBlog);
			const blogs = queryClient.getQueryData(["blogs"]);
			queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
			setNotification(
				dispatch,
				`A new blog ${newBlog.title} by ${newBlog.author} added`,
				true,
				5
			);
		},
		onError: (blogError) => {
			const errorMessage =
				blogError.response?.data?.error ||
				blogError.message ||
				"An unknown error occurred";
			setNotification(dispatch, errorMessage, false, 5);
		},
	});

	const addBlog = async (e) => {
		e.preventDefault();
		const title = e.target.title.value;
		const author = e.target.author.value;
		const url = e.target.url.value;
		e.target.title.value = "";
		e.target.author.value = "";
		e.target.url.value = "";
		const blog = { title, author, url };

		newBlogMutation.mutate(blog);
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
