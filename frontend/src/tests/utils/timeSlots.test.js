import { describe, it, expect } from "vitest";
import { generateTimeSlots, HEURES_DISPONIBLES } from "../../utils/timeSlots";

describe("timeSlots utils", () => {
  describe("generateTimeSlots", () => {
    it("devrait générer un tableau d'heures de 8h à 18h", () => {
      const creneaux = generateTimeSlots();
      
      expect(creneaux).toHaveLength(11);
      expect(creneaux[0]).toBe("08:00");
      expect(creneaux[10]).toBe("18:00");
    });

    it("devrait générer les heures au bon format HH:00", () => {
      const creneaux = generateTimeSlots();
      
      creneaux.forEach((heure) => {
        expect(heure).toMatch(/^\d{2}:00$/);
      });
    });

    it("devrait contenir toutes les heures de 8 à 18", () => {
      const creneaux = generateTimeSlots();
      const expectedHeures = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
      ];
      
      expect(creneaux).toEqual(expectedHeures);
    });
  });

  describe("HEURES_DISPONIBLES", () => {
    it("devrait être un tableau de 11 heures", () => {
      expect(HEURES_DISPONIBLES).toHaveLength(11);
    });

    it("devrait commencer à 08:00 et finir à 18:00", () => {
      expect(HEURES_DISPONIBLES[0]).toBe("08:00");
      expect(HEURES_DISPONIBLES[HEURES_DISPONIBLES.length - 1]).toBe("18:00");
    });
  });
});
