import { type Page, type Locator } from "@playwright/test";

/**
 * Page Object para la página de inventario/catálogo (Sauce Demo).
 * Encapsula selectores y acciones tras el login exitoso.
 */
export class InventoryPage {
  readonly page: Page;
  readonly titleProducts: Locator;
  readonly buttonMenu: Locator;
  readonly linkLogout: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleProducts = page.getByRole("heading", { name: /products/i });
    this.buttonMenu = page.getByRole("button", { name: /open menu/i });
    this.linkLogout = page.getByRole("link", { name: /logout/i });
    this.inventoryItems = page.locator(".inventory_item");
  }

  /**
   * Comprueba si la página de inventario está cargada (titulo "Products" visible).
   * @returns true si la página de productos es visible.
   */
  async isLoaded(): Promise<boolean> {
    return this.titleProducts.isVisible();
  }

  /**
   * Obtiene el número de productos listados en el inventario.
   * @returns Cantidad de items en la lista.
   */
  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  /**
   * Abre el menú lateral y hace clic en Logout.
   */
  async logout(): Promise<void> {
    try {
      await this.buttonMenu.click();
      await this.linkLogout.click();
    } catch (error) {
      throw new Error(
        `Error durante el logout: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
