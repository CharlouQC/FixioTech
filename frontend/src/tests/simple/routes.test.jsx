import { describe, it, expect, vi, beforeEach} from "vitest";
import { render } from "@testing-library/react";

const mockUseAuth = vi.fn();

vi.mock("react-router-dom", () => ({
  Navigate: ({ to }) => <div data-testid="navigate" data-to={to} />,
  Outlet: () => <div data-testid="outlet">Protected Content</div>,
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait rediriger si non authentifié", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, role: null });
    
    const { default: ProtectedRoute } = await import("../../routes/ProtectedRoute");
    
    const { getByTestId } = render(
      <ProtectedRoute allowedRoles={["client"]} />
    );
    
    const navigate = getByTestId("navigate");
    expect(navigate.getAttribute("data-to")).toBe("/login");
  });

  it("devrait afficher le contenu si authentifié avec bon rôle", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "client" });
    
    const { default: ProtectedRoute } = await import("../../routes/ProtectedRoute");
    
    const { getByTestId } = render(
      <ProtectedRoute allowedRoles={["client"]} />
    );
    
    expect(getByTestId("outlet")).toBeInTheDocument();
  });

  it("devrait rediriger si rôle incorrect", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "client" });
    
    const { default: ProtectedRoute } = await import("../../routes/ProtectedRoute");
    
    const { getByTestId } = render(
      <ProtectedRoute allowedRoles={["admin"]} />
    );
    
    const navigate = getByTestId("navigate");
    expect(navigate.getAttribute("data-to")).toBe("/");
  });
});
