const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
	beforeEach(async ({ page }) => {
		await page.goto("http://localhost:5173");
	});

	test("Login form is shown", async ({ page }) => {
		// await page.getByRole("button", { name: "login" }).click();
		await page.getByTestId("username").fill("Tiuz");
		await page.getByTestId("password").fill("Zanetti");
		await page.getByRole("button", { name: "login" }).click();
		await expect(page.getByText("Matteo logged in")).toBeVisible();
	});
});
