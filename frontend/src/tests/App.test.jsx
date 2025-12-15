import { describe, it, expect } from "vitest";
import { generateTimeSlots, HEURES_DISPONIBLES } from "../utils/timeSlots";

// Tests simples pour couvrir App.jsx indirectement via les utilitaires
describe("App utilities", () => {
  it("devrait exporter les constantes nécessaires", () => {
    expect(HEURES_DISPONIBLES).toBeDefined();
    expect(Array.isArray(HEURES_DISPONIBLES)).toBe(true);
  });

  it("devrait générer les créneaux horaires correctement", () => {
    const slots = generateTimeSlots();
    expect(slots).toHaveLength(11);
    expect(slots[0]).toBe("08:00");
  });

  it("devrait formater les heures avec zéro initial", () => {
    const slots = generateTimeSlots();
    slots.forEach(slot => {
      expect(slot).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});
