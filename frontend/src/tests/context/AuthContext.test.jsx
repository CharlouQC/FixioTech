import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act} from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/AuthContext";

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("devrait initialiser avec user null si pas de données dans localStorage", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toBeNull();
  });

  it("devrait charger l'utilisateur depuis localStorage au montage", () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      nom_complet: "Test User",
      role: "client",
    };
    
    localStorage.setItem("user", JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user).toEqual(mockUser);
  });

  it("devrait permettre de connecter un utilisateur", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const mockUser = {
      id: 1,
      email: "test@example.com",
      nom_complet: "Test User",
      role: "client",
    };

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
  });

  it("devrait permettre de déconnecter un utilisateur", () => {
    const mockUser = {
      id: 1,
      email: "test@example.com",
      nom_complet: "Test User",
      role: "client",
    };
    
    localStorage.setItem("user", JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
