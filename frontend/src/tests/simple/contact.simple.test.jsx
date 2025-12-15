import { describe, it, expect} from "vitest";
import { render } from "@testing-library/react";

describe("Contact Page", () => {
  it("devrait se rendre sans erreur", async () => {
    const { default: Contact } = await import("../../vues/contact");
    const { container } = render(<Contact />);
    expect(container).toBeTruthy();
  });

  it("devrait afficher le formulaire", async () => {
    const { default: Contact } = await import("../../vues/contact");
    const { getByLabelText } = render(<Contact />);
    expect(getByLabelText("Nom *")).toBeInTheDocument();
    expect(getByLabelText("Prénom *")).toBeInTheDocument();
  });

  it("devrait afficher les informations de contact", async () => {
    const { default: Contact } = await import("../../vues/contact");
    const { container } = render(<Contact />);
    expect(container.textContent).toContain("Nom");
  });
});
