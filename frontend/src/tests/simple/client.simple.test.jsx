import { describe, it, expect, vi, beforeEach} from "vitest";
import { render} from "@testing-library/react";

vi.mock("react-router-dom", () => ({}));

const mockUseAuth = vi.fn();
vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

const mockGetRendezVousByClient = vi.fn();
const mockGetEmployes = vi.fn();

vi.mock("../../../services/apiRendezVous", () => ({
  getRendezVousByClient: (...args) => mockGetRendezVousByClient(...args),
}));

vi.mock("../../../services/apiUtilisateur", () => ({
  getEmployes: (...args) => mockGetEmployes(...args),
}));

describe("Client Page", () => {
  beforeEach(() => {
    mockUseAuth.mockReturnValue({ user: { id: 1 } });
    mockGetRendezVousByClient.mockResolvedValue([]);
    mockGetEmployes.mockResolvedValue([]);
  });

  it("devrait se rendre sans erreur", async () => {
    const { default: Client } = await import("../../vues/client");
    const { container } = render(<Client />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher un message de chargement", async () => {
    mockGetRendezVousByClient.mockImplementation(() => new Promise(() => {}));
    const { default: Client } = await import("../../vues/client");
    const { getByText } = render(<Client />);
    expect(getByText(/chargement/i)).toBeInTheDocument();
  });

  it("devrait afficher message si aucun RDV", async () => {
    const { default: Client } = await import("../../vues/client");
    const { findByText } = render(<Client />);
    const msg = await findByText(/pas encore de rendez-vous/i);
    expect(msg).toBeInTheDocument();
  });
});
