import { describe, it, expect, vi, beforeEach} from "vitest";
import { render} from "@testing-library/react";

const mockUseAuth = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetRendezVous = vi.fn();
const mockGetEmployes = vi.fn();

vi.mock("../../../services/apiRendezVous", () => ({
  getRendezVous: (...args) => mockGetRendezVous(...args),
  addRendezVous: vi.fn(),
}));

vi.mock("../../../services/apiUtilisateur", () => ({
  getEmployes: (...args) => mockGetEmployes(...args),
  getEmployesDisponibles: vi.fn().mockResolvedValue([]),
}));

describe("RendezVous Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });
    mockGetEmployes.mockResolvedValue([
      { id: 1, nom_complet: "Tech 1" },
      { id: 2, nom_complet: "Tech 2" },
    ]);
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: RendezVous } = await import("../../vues/rendez-vous");
    const { container } = render(<RendezVous />);
    expect(container).toBeTruthy();
  });

  it("devrait charger les techniciens", async () => {
    const { default: RendezVous } = await import("../../vues/rendez-vous");
    const { findByText } = render(<RendezVous />);
    await findByText("Tech 1");
    expect(true).toBe(true);
  });

  it("devrait afficher message si aucun tech", async () => {
    mockGetEmployes.mockResolvedValue([]);
    const { default: RendezVous } = await import("../../vues/rendez-vous");
    const { findByText } = render(<RendezVous />);
    await findByText(/aucun technicien/i);
    expect(true).toBe(true);
  });
});
