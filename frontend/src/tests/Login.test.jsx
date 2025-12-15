import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Login from "../vues/login";
import * as apiUtilisateur from "../../services/apiUtilisateur";

// Mock du hook useNavigate
const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    __esModule: true,
    ...actual,
    useNavigate: () => mockNavigate,
    Link: actual.Link,
    NavLink: actual.NavLink,
  };
});

// Mock d'AuthContext
vi.mock("../context/AuthContext.jsx", () => ({
  useAuth: () => ({
    login: mockLogin,
    user: null,
  }),
}));

// Mock du service API
vi.mock("../../services/apiUtilisateur", () => ({
  loginUtilisateur: vi.fn(),
}));

describe("Login Component", () => {
  // Réinitialise les mocks avant chaque test
  beforeEach(() => {
    mockNavigate.mockReset();
    mockLogin.mockReset();
  });

  it("devrait rendre le formulaire de connexion", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Vérifie que les éléments essentiels sont présents
    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse courriel")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Se connecter" })
    ).toBeInTheDocument();
  });

  it("devrait afficher une erreur si les champs sont vides", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Clique sur le bouton sans remplir les champs
    const submitButton = screen.getByRole("button", { name: "Se connecter" });
    await userEvent.click(submitButton);

    // Vérifie le message d'erreur
    expect(
      screen.getByText("Veuillez remplir tous les champs")
    ).toBeInTheDocument();
  });

  it("devrait permettre la saisie des données", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simule la saisie des données
    const emailInput = screen.getByLabelText("Adresse courriel");
    const passwordInput = screen.getByLabelText("Mot de passe");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");

    // Vérifie que les valeurs ont été saisies
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("devrait rediriger vers la page d'accueil après une connexion réussie", async () => {
    // Mock d'une réponse API réussie
    const mockUser = {
      id: 1,
      email: "test@example.com",
      nom_complet: "Test User",
      role: "client",
    };
    vi.spyOn(apiUtilisateur, "loginUtilisateur").mockResolvedValue(mockUser);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Simule une connexion réussie
    const emailInput = screen.getByLabelText("Adresse courriel");
    const passwordInput = screen.getByLabelText("Mot de passe");
    const submitButton = screen.getByRole("button", { name: "Se connecter" });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    // Attend que mockLogin soit appelé (avec l'utilisateur normalisé)
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
    
    // Attend la navigation vers la page client
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/client");
    });
  });
});
