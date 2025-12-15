import { describe, it, expect, vi, beforeEach} from "vitest";
import { render} from "@testing-library/react";

const mockUseAuth = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetHoraireByEmploye = vi.fn();
vi.mock("../../../services/apiHoraire", () => ({
  getHoraireByEmploye: (...args) => mockGetHoraireByEmploye(...args),
  addHoraire: vi.fn(),
  updateHoraire: vi.fn(),
}));

describe("Horaires Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "employe" });
    mockGetHoraireByEmploye.mockResolvedValue(null);
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: Horaires } = await import("../../vues/horaires");
    const { container } = render(<Horaires />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher les jours de la semaine", async () => {
    const { default: Horaires } = await import("../../vues/horaires");
    const { findByText } = render(<Horaires />);
    await findByText(/lundi/i);
    expect(true).toBe(true);
  });

  it("devrait afficher message pour non-employé", async () => {
    mockUseAuth.mockReturnValue({ user: { id: 1 }, role: "client" });
    const { default: Horaires } = await import("../../vues/horaires");
    const { container } = render(<Horaires />);
    expect(container.textContent).toContain("Accès Restreint");
  });
});
