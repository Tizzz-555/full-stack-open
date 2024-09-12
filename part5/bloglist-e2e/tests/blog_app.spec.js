const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith } = require("./helper");

describe("Blog app", () => {
	beforeEach(async ({ page, request }) => {
		await request.post("http://localhost:3000/api/testing/reset");
		await request.post("http://localhost:3000/api/users", {
			data: {
				name: "Matteo",
				username: "Tiuz",
				password: "Zanetti",
			},
		});
		await page.goto("http://localhost:5173");
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
});
