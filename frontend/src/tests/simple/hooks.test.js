import { describe, it, expect, vi, beforeEach} from "vitest";

// Mock dependencies
const mockNavigate = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

describe("useRoleNavigation hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("devrait retourner des fonctions de navigation", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, role: null });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    
    const hook = useRoleNavigation();
    
    expect(hook).toHaveProperty("navigateToBooking");
    expect(hook).toHaveProperty("navigateToSecondary");
    expect(typeof hook.navigateToBooking).toBe("function");
    expect(typeof hook.navigateToSecondary).toBe("function");
  });

  it("navigateToBooking devrait naviguer pour employé", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "employe" });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    const hook = useRoleNavigation();
    
    hook.navigateToBooking();
    expect(mockNavigate).toHaveBeenCalledWith("/employe");
  });

  it("navigateToBooking devrait naviguer vers RDV pour client", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "client" });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    const hook = useRoleNavigation();
    
    hook.navigateToBooking();
    expect(mockNavigate).toHaveBeenCalledWith("/rendez-vous");
  });

  it("navigateToBooking devrait naviguer vers inscription si non authentifié", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, role: null });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    const hook = useRoleNavigation();
    
    hook.navigateToBooking();
    expect(mockNavigate).toHaveBeenCalledWith("/inscription");
  });

  it("navigateToSecondary devrait naviguer vers horaires pour employé", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "employe" });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    const hook = useRoleNavigation();
    
    hook.navigateToSecondary();
    expect(mockNavigate).toHaveBeenCalledWith("/horaires");
  });

  it("navigateToSecondary devrait naviguer vers services pour autres", async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, role: "client" });
    
    const { useRoleNavigation } = await import("../../hooks/useRoleNavigation");
    const hook = useRoleNavigation();
    
    hook.navigateToSecondary();
    expect(mockNavigate).toHaveBeenCalledWith("/services_aides");
  });
});
