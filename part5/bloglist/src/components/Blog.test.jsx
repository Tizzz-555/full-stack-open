import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders header, doesn't render details", () => {
	const blog = {
		title: "Test",
		author: "Testone",
		url: "www.test.te",
		likes: "4",
		user: {
			username: "Tizzz",
			name: "Mattia",
			id: "667d908773d4e0852d6017b5",
		},
	};

	const { container } = render(<Blog blog={blog} />);

	const header = container.querySelector("#header");
	const details = container.querySelector("#details");

	expect(header).toBeDefined();
	expect(details).toHaveStyle("display: none");
});
