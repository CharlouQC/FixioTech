import { describe, it, expect, vi } from "vitest";

// Mock all dependencies to just test the App module structure
vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: () => <div data-testid="route" />,
}));

vi.mock("../../routes/ProtectedRoute", () => ({
  default: () => <div data-testid="protected" />,
}));

vi.mock("../../vues/Navigation/MainNavigation", () => ({
  default: () => <div data-testid="nav" />,
}));

vi.mock("../../vues/accueil", () => ({ default: () => <div /> }));
vi.mock("../../vues/login", () => ({ default: () => <div /> }));
vi.mock("../../vues/inscription", () => ({ default: () => <div /> }));
vi.mock("../../vues/services_aides", () => ({ default: () => <div /> }));
vi.mock("../../vues/contact", () => ({ default: () => <div /> }));
vi.mock("../../vues/rendez-vous", () => ({ default: () => <div /> }));
vi.mock("../../vues/client", () => ({ default: () => <div /> }));
vi.mock("../../vues/horaires", () => ({ default: () => <div /> }));
vi.mock("../../vues/employe", () => ({ default: () => <div /> }));
vi.mock("../../vues/logs", () => ({ default: () => <div /> }));

describe("App module", () => {
  it("devrait être importable sans erreur", async () => {
    const AppModule = await import("../../App");
    expect(AppModule.default).toBeDefined();
  });

  it("devrait exporter un composant React valide", async () => {
    const AppModule = await import("../../App");
    const App = AppModule.default;
    expect(typeof App).toBe("function");
  });
});
