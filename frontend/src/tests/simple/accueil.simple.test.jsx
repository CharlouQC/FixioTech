import { describe, it, expect, vi, beforeEach} from "vitest";
import { render } from "@testing-library/react";

// Mock toutes les dépendances
vi.mock("react-router-dom", () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

const mockUseAuth = vi.fn();
const mockNavigateToBooking = vi.fn();
const mockNavigateToSecondary = vi.fn();

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

vi.mock("../../hooks/useRoleNavigation", () => ({
  useRoleNavigation: () => ({
    navigateToBooking: mockNavigateToBooking,
    navigateToSecondary: mockNavigateToSecondary,
  }),
}));

describe("Accueil Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ role: null });
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: Accueil } = await import("../../vues/accueil");
    const { container } = render(<Accueil />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher le contenu de la page", async () => {
    const { default: Accueil } = await import("../../vues/accueil");
    const { getByText } = render(<Accueil />);
    expect(getByText(/support informatique/i)).toBeInTheDocument();
  });

  it("devrait afficher les boutons CTA", async () => {
    const { default: Accueil } = await import("../../vues/accueil");
    const { container } = render(<Accueil />);
    const buttons = container.querySelectorAll(".cta-bouton-primary, .cta-bouton-secondary");
    expect(buttons.length).toBeGreaterThan(0);
  });
});
