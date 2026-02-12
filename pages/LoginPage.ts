import { type Page, type Locator } from "@playwright/test";

/**
 * Page Object para la página de login (Sauce Demo).
 * Encapsula selectores y acciones del formulario de inicio de sesión.
 */
export class LoginPage {
  readonly page: Page;
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly buttonLogin: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputUsername = page.getByPlaceholder("Username");
    this.inputPassword = page.getByPlaceholder("Password");
    this.buttonLogin = page.getByRole("button", { name: /login/i });
    this.errorMessage = page.getByRole("heading", {
      name: /epic sadface/i,
      exact: false,
    });
  }

  /**
   * Navega a la URL de login.
   * @param url - URL base (opcional, usa baseURL del config si no se pasa).
   */
  async goto(url?: string): Promise<void> {
    try {
      await this.page.goto(url ?? "/");
    } catch (error) {
      throw new Error(
        `Error al navegar a la página de login: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Realiza el login con usuario y contraseña.
   * @param username - Nombre de usuario.
   * @param password - Contraseña.
   */
  async login(username: string, password: string): Promise<void> {
    try {
      await this.inputUsername.fill(username);
      await this.inputPassword.fill(password);
      await this.buttonLogin.click();
    } catch (error) {
      throw new Error(
        `Error durante el login: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  /**
   * Indica si se muestra el mensaje de error de credenciales.
   * @returns true si el mensaje de error está visible.
   */
  async isErrorMessageVisible(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}
