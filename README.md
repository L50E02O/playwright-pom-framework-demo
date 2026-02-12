# playwright-pom-framework-demo

Proyecto de automatización E2E con **Playwright**, **TypeScript** y patrón **Page Object Model (POM)**. Incluye integración con **Allure Report** para reportes HTML.

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

1. Clonar el repositorio (o ubicarse en la carpeta del proyecto).

2. Instalar dependencias:

```bash
npm install
```

3. Instalar los navegadores de Playwright (solo la primera vez):

```bash
npx playwright install
```

4. (Opcional) Para generar y abrir reportes Allure, instalar Allure Commandline:

   - **Windows (scoop):** `scoop install allure`
   - **macOS:** `brew install allure`
   - O descargar desde [https://github.com/allure-framework/allure2/releases](https://github.com/allure-framework/allure2/releases) y añadir el binario al PATH.

## Estructura del proyecto

| Carpeta/Archivo   | Descripción                                      |
|-------------------|--------------------------------------------------|
| `pages/`          | Page Objects (LoginPage, InventoryPage)          |
| `tests/`          | Especificaciones de pruebas (`.spec.ts`)         |
| `playwright.config.ts` | Configuración de Playwright y reporter Allure |
| `allure-results/` | Resultados raw de Allure (generado al ejecutar)  |
| `allure-report/`  | Reporte HTML de Allure (generado con `npm run report`) |

## Ejecutar tests

### Modo headless (sin ventana del navegador)

Por defecto los tests se ejecutan en modo headless:

```bash
npm run test
```

o de forma explícita:

```bash
npm run test:headless
```

Equivalente a:

```bash
npx playwright test
```

### Modo headed (con ventana del navegador visible)

Para ver el navegador mientras corren los tests:

```bash
npm run test:headed
```

Equivalente a:

```bash
npx playwright test --headed
```

### Otras opciones útiles

| Comando              | Descripción                          |
|----------------------|--------------------------------------|
| `npm run test`       | Ejecuta todos los tests (headless)   |
| `npm run test:headed`| Ejecuta tests con navegador visible  |
| `npm run test:ui`    | Abre la UI de Playwright             |
| `npx playwright test --project=chromium` | Solo Chromium                |
| `npx playwright test tests/login.spec.ts` | Solo el archivo indicado      |

## Generar y abrir reporte Allure

Después de ejecutar los tests, se generan los resultados en `allure-results/`. Para generar el reporte HTML y abrirlo en el navegador:

```bash
npm run report
```

Requiere tener **Allure Commandline** instalado (ver sección Instalación). Si no lo tienes, los resultados siguen guardándose en `allure-results/` para poder generar el reporte más adelante.

## Tecnologías

- **Playwright** – Automatización E2E
- **TypeScript** – Tipado estático
- **Allure Playwright** – Reporter para Allure Report
- **Sauce Demo** – Aplicación de prueba (https://www.saucedemo.com)

## Convenciones

- Page Objects en `pages/` encapsulan selectores y acciones por pantalla.
- Los tests importan las pages y no acceden al DOM directamente.
- Selectores priorizados: `getByRole`, `getByPlaceholder`, `getByText` o `data-testid`.
