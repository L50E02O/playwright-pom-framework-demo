import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe("Login", () => {
  test("login exitoso con credenciales válidas redirige a inventario", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(inventoryPage.titleProducts).toBeVisible();
    expect(await inventoryPage.getProductCount()).toBeGreaterThan(0);
  });

  test("login con credenciales inválidas muestra mensaje de error", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("invalid_user", "wrong_password");

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
