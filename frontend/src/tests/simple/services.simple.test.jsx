import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({ isAuthenticated: false, role: null }),
}));

vi.mock("../../hooks/useRoleNavigation", () => ({
  useRoleNavigation: () => ({
    navigateToBooking: vi.fn(),
    navigateToSecondary: vi.fn(),
  }),
}));

describe("Services & Aides Page", () => {
  it("devrait se rendre sans erreur", async () => {
    const { default: Services } = await import("../../vues/services_aides");
    const { container } = render(<Services />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher le contenu", async () => {
    const { default: Services } = await import("../../vues/services_aides");
    const { container } = render(<Services />);
    expect(container.textContent.length).toBeGreaterThan(0);
  });
});
