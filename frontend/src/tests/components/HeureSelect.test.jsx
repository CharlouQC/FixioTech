import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeureSelect from "../../vues/components/HeureSelect";

describe("HeureSelect Component", () => {
  const user = userEvent.setup({ delay: null });

  it("devrait rendre le select avec les heures disponibles", () => {
    const heures = ["09:00", "10:00", "11:00", "14:00"];
    const mockOnChange = vi.fn();

    render(<HeureSelect label="Heure" id="heure" heures={heures} onChange={mockOnChange} value="" />);

    expect(screen.getByLabelText("Heure")).toBeInTheDocument();
    
    // Vérifie que toutes les heures sont présentes
    heures.forEach((heure) => {
      expect(screen.getByText(heure)).toBeInTheDocument();
    });
  });

  it("devrait appeler onChange lors de la sélection d'une heure", async () => {
    const heures = ["09:00", "10:00", "11:00"];
    const mockOnChange = vi.fn();

    render(<HeureSelect label="Heure" id="heure" heures={heures} onChange={mockOnChange} value="" />);

    const select = screen.getByLabelText("Heure");
    await user.selectOptions(select, "10:00");

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("devrait afficher la valeur sélectionnée", () => {
    const heures = ["09:00", "10:00", "11:00"];
    const mockOnChange = vi.fn();

    render(<HeureSelect label="Heure" id="heure" heures={heures} value="10:00" onChange={mockOnChange} />);

    const select = screen.getByLabelText("Heure");
    expect(select).toHaveValue("10:00");
  });

  it("devrait rendre correctement avec un tableau vide", () => {
    const mockOnChange = vi.fn();

    render(<HeureSelect label="Heure" id="heure" heures={[]} onChange={mockOnChange} value="" />);

    expect(screen.getByLabelText("Heure")).toBeInTheDocument();
  });
});
