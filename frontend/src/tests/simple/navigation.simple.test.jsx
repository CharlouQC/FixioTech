import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => mockNavigate,
}));

const mockLogout = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
    role: null,
    user: null,
    logout: mockLogout,
  }),
}));

describe("MainNavigation", () => {

  it("devrait se rendre sans erreur", async () => {
    const { default: MainNavigation } = await import("../../vues/Navigation/MainNavigation");
    const { container } = render(<MainNavigation />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher les liens de navigation", async () => {
    const { default: MainNavigation } = await import("../../vues/Navigation/MainNavigation");
    const { container } = render(<MainNavigation />);
    const links = container.querySelectorAll("a");
    expect(links.length).toBeGreaterThan(0);
  });

  it("devrait afficher logo/titre", async () => {
    const { default: MainNavigation } = await import("../../vues/Navigation/MainNavigation");
    const { getByText } = render(<MainNavigation />);
    expect(getByText(/fixiotech/i)).toBeInTheDocument();
  });
});
