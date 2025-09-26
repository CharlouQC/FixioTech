import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Inscription from "../vues/inscription";

// Mock du hook useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Inscription Component", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("devrait rendre le formulaire d'inscription", () => {
    render(<Inscription />);

    // Vérifie que les éléments essentiels sont présents
    expect(screen.getByText("Inscription")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse courriel")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Confirmer le mot de passe")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Type de compte")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "S'inscrire" })
    ).toBeInTheDocument();
  });

  it("devrait afficher une erreur si les champs sont vides", async () => {
    render(<Inscription />);

    const submitButton = screen.getByRole("button", { name: "S'inscrire" });
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Veuillez remplir tous les champs")
    ).toBeInTheDocument();
  });

  it("devrait afficher une erreur si les mots de passe ne correspondent pas", async () => {
    render(<Inscription />);

    // Remplit le formulaire avec des mots de passe différents
    await userEvent.type(
      screen.getByLabelText("Adresse courriel"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Mot de passe"), "password123");
    await userEvent.type(
      screen.getByLabelText("Confirmer le mot de passe"),
      "different123"
    );

    const submitButton = screen.getByRole("button", { name: "S'inscrire" });
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Les mots de passe ne correspondent pas")
    ).toBeInTheDocument();
  });

  it("devrait afficher une erreur si le mot de passe est trop court", async () => {
    render(<Inscription />);

    // Remplit le formulaire avec un mot de passe court
    await userEvent.type(
      screen.getByLabelText("Adresse courriel"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Mot de passe"), "123");
    await userEvent.type(
      screen.getByLabelText("Confirmer le mot de passe"),
      "123"
    );

    const submitButton = screen.getByRole("button", { name: "S'inscrire" });
    await userEvent.click(submitButton);

    expect(
      screen.getByText("Le mot de passe doit contenir au moins 8 caractères")
    ).toBeInTheDocument();
  });

  it("devrait permettre une inscription réussie", async () => {
    render(<Inscription />);

    // Remplit le formulaire correctement
    await userEvent.type(
      screen.getByLabelText("Adresse courriel"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Mot de passe"), "password123");
    await userEvent.type(
      screen.getByLabelText("Confirmer le mot de passe"),
      "password123"
    );
    await userEvent.selectOptions(
      screen.getByLabelText("Type de compte"),
      "client"
    );

    const submitButton = screen.getByRole("button", { name: "S'inscrire" });
    await userEvent.click(submitButton);

    // Vérifie que le message de succès s'affiche
    await waitFor(() => {
      expect(
        screen.getByText("Votre compte a été créé avec succès !")
      ).toBeInTheDocument();
    });
  });
});
