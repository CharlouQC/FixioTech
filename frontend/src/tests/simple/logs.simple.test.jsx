import { describe, it, expect, vi, beforeEach} from "vitest";
import { render} from "@testing-library/react";

const mockUseAuth = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetRendezVous = vi.fn();
const mockGetUtilisateurs = vi.fn();

vi.mock("../../../services/apiRendezVous", () => ({
  getRendezVous: (...args) => mockGetRendezVous(...args),
}));

vi.mock("../../../services/apiUtilisateur", () => ({
  getUtilisateurs: (...args) => mockGetUtilisateurs(...args),
}));

describe("Logs Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "admin" });
    mockGetRendezVous.mockResolvedValue([]);
    mockGetUtilisateurs.mockResolvedValue([]);
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: Logs } = await import("../../vues/logs");
    const { container } = render(<Logs />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher les statistiques de logs", async () => {
    const { default: Logs } = await import("../../vues/logs");
    const { container } = render(<Logs />);
    expect(container.textContent).toContain("Logs Système");
  });

  it("devrait afficher contenu pour admin", async () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "admin" });
    const { default: Logs } = await import("../../vues/logs");
    const { container } = render(<Logs />);
    expect(container.textContent).toContain("Logs");
  });
});
