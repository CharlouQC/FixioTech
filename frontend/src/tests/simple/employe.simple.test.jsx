import { describe, it, expect, vi, beforeEach} from "vitest";
import { render} from "@testing-library/react";

const mockUseAuth = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetRendezVous = vi.fn();
vi.mock("../../../services/apiRendezVous", () => ({
  getRendezVous: (...args) => mockGetRendezVous(...args),
}));

describe("Employe Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "employe" });
    mockGetRendezVous.mockResolvedValue([]);
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: Employe } = await import("../../vues/employe");
    const { container } = render(<Employe />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher un message de chargement", async () => {
    mockGetRendezVous.mockImplementation(() => new Promise(() => {}));
    const { default: Employe } = await import("../../vues/employe");
    const { getByText } = render(<Employe />);
    expect(getByText(/chargement/i)).toBeInTheDocument();
  });

  it("devrait afficher message si aucune demande", async () => {
    const { default: Employe } = await import("../../vues/employe");
    const { findByText } = render(<Employe />);
    const msg = await findByText(/aucune demande/i);
    expect(msg).toBeInTheDocument();
  });

  it("devrait refuser accès non-employé", async () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "client" });
    const { default: Employe } = await import("../../vues/employe");
    const { findByText } = render(<Employe />);
    const msg = await findByText(/réservée aux techniciens/i);
    expect(msg).toBeInTheDocument();
  });
});
