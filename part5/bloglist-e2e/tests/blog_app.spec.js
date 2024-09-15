const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("/api/testing/reset");
		await request.post("/api/users", {
			data: {
				name: "Matteo",
				username: "Tiuz",
				password: "Zanetti",
			},
		});
		await page.goto("/");
	});

	test("Login form is shown", async ({ page }) => {
		const locator = await page.getByText("Log in to application");
		await expect(locator).toBeVisible();
		await expect(page.getByTestId("username")).toBeVisible();
		await expect(page.getByTestId("password")).toBeVisible();
		await expect(page.getByRole("button", { name: "login" })).toBeVisible();
	});

	describe("Login", () => {
		test("succeeds with correct credentials", async ({ page }) => {
			await loginWith(page, "Tiuz", "Zanetti");

			const okDiv = await page.locator(".ok");
			await expect(okDiv).toContainText("User Tiuz successfully logged in");
			await expect(okDiv).toHaveCSS("border-style", "solid");
			await expect(okDiv).toHaveCSS("color", "rgb(0, 128, 0)");
			await expect(page.getByText("Matteo logged in")).toBeVisible();
		});

		test("fails with wrong credentials", async ({ page }) => {
			await loginWith(page, "Tiuz", "Maldini");

			const errorDiv = await page.locator(".error");
			await expect(errorDiv).toContainText("Wrong username or password");
			await expect(errorDiv).toHaveCSS("border-style", "solid");
			await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
			await expect(page.getByText("Matteo logged in")).not.toBeVisible();
		});
	});

	describe("when logged in", () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, "Tiuz", "Zanetti");
		});

		test("a new blog can be created", async ({ page }) => {
			await createBlog(page, "Tituli", "Moufrinho", "www.amala.it");
			await expect(
				page.getByText("A new blog Tituli by Moufrinho added")
			).toBeVisible();
		});

		describe("and a blog exists", () => {
			beforeEach(async ({ page }) => {
				await createBlog(page, "Zamorano", "Moratti", "www.maiinb.org");
				await createBlog(page, "Djorkaeff", "Moratti", "www.zioliga.it");
				await createBlog(page, "El Principe", " Moufrinho", "www.amala.it");
			});

			test("a blog can be liked", async ({ page }) => {
				const secondBlogTitle = await page.getByText("Djorkaeff");
				const secondBlogElement = await secondBlogTitle.locator("..");
				const secondBlogDetails = await page.getByTestId("details");

				await secondBlogElement.getByRole("button", { name: "View" }).click();
				await secondBlogDetails.getByRole("button", { name: "Like" }).click();
				await expect(secondBlogDetails.getByText("1")).toBeVisible();
			});
		});
	});
});
