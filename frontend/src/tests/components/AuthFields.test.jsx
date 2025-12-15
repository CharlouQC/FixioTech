import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthFields from "../../vues/components/AuthFields";

describe("AuthFields Component", () => {
  const user = userEvent.setup({ delay: null });

  it("devrait rendre les champs email et mot de passe", () => {
    const mockFormData = { courriel: "", mot_de_passe: "" };
    const mockHandleChange = vi.fn();

    render(<AuthFields formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText("Adresse courriel")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
  });

  it("devrait appeler handleChange lors de la saisie dans l'email", async () => {
    const mockFormData = { courriel: "", mot_de_passe: "" };
    const mockHandleChange = vi.fn();

    render(<AuthFields formData={mockFormData} handleChange={mockHandleChange} />);

    const emailInput = screen.getByLabelText("Adresse courriel");
    await user.type(emailInput, "test@example.com");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("devrait appeler handleChange lors de la saisie du mot de passe", async () => {
    const mockFormData = { courriel: "", mot_de_passe: "" };
    const mockHandleChange = vi.fn();

    render(<AuthFields formData={mockFormData} handleChange={mockHandleChange} />);

    const passwordInput = screen.getByLabelText("Mot de passe");
    await user.type(passwordInput, "password123");

    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("devrait afficher les valeurs du formData", () => {
    const mockFormData = { courriel: "test@example.com", mot_de_passe: "secret123" };
    const mockHandleChange = vi.fn();

    render(<AuthFields formData={mockFormData} handleChange={mockHandleChange} />);

    expect(screen.getByLabelText("Adresse courriel")).toHaveValue("test@example.com");
    expect(screen.getByLabelText("Mot de passe")).toHaveValue("secret123");
  });

  it("devrait afficher le champ de confirmation quand showConfirmPassword est true", () => {
    const mockFormData = { courriel: "", mot_de_passe: "", confirmer_mot_de_passe: "" };
    const mockHandleChange = vi.fn();

    render(<AuthFields formData={mockFormData} handleChange={mockHandleChange} showConfirmPassword={true} />);

    expect(screen.getByLabelText("Confirmer le mot de passe")).toBeInTheDocument();
  });
});
