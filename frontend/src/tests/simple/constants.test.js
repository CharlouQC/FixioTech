import { describe, it, expect } from "vitest";
import { SERVICES } from "../../constants";

describe("Constants", () => {
  it("devrait exporter SERVICES comme tableau", () => {
    expect(Array.isArray(SERVICES)).toBe(true);
  });

  it("devrait contenir les services attendus", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
  });

  it("chaque service devrait être une string", () => {
    SERVICES.forEach(service => {
      expect(typeof service).toBe("string");
    });
  });
});
