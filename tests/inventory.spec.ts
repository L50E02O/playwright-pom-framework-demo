import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Inventario", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
  });

  test("página de productos se carga correctamente", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.isLoaded()).toBe(true);
  });

  test("logout redirige a la página de login", async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.logout();
    await expect(page).toHaveURL(/\/$/);
  });
});
