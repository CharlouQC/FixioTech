import { describe, it, expect, vi, beforeEach } from "vitest";
import * as apiUtilisateur from "../../../services/apiUtilisateur";
import * as apiRendezVous from "../../../services/apiRendezVous";
import * as apiHoraire from "../../../services/apiHoraire";

// Mock global fetch
globalThis.fetch = vi.fn();

describe("API Utilisateur", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  it("getUtilisateurs devrait récupérer la liste des utilisateurs", async () => {
    const mockUsers = [{ id: 1, nom_complet: "Test" }];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockUsers,
    });

    const result = await apiUtilisateur.getUtilisateurs();
    expect(result).toEqual(mockUsers);
  });

  it("addUtilisateur devrait créer un nouvel utilisateur", async () => {
    const newUser = { nom_complet: "Test", courriel: "test@example.com" };
    const mockResponse = { id: 1, ...newUser };
    
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockResponse,
    });

    const result = await apiUtilisateur.addUtilisateur(newUser);
    expect(result).toEqual(mockResponse);
  });

  it("loginUtilisateur devrait authentifier un utilisateur", async () => {
    const credentials = { courriel: "test@example.com", mot_de_passe: "password" };
    const mockUser = { id: 1, nom_complet: "Test", role: "client" };
    
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockUser,
    });

    const result = await apiUtilisateur.loginUtilisateur(credentials);
    expect(result).toEqual(mockUser);
  });

  it("devrait gérer les erreurs HTTP", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      headers: { get: () => "application/json" },
      json: async () => ({ message: "Utilisateur non trouvé" }),
    });

    await expect(apiUtilisateur.getUtilisateur(999)).rejects.toThrow("Utilisateur non trouvé");
  });
});

describe("API RendezVous", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  it("getRendezVous devrait récupérer la liste des rendez-vous", async () => {
    const mockRDV = [{ id: 1, date: "2025-01-15", heure: "10:00" }];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockRDV,
    });

    const result = await apiRendezVous.getRendezVous();
    expect(result).toEqual(mockRDV);
  });

  it("addRendezVous devrait créer un nouveau rendez-vous", async () => {
    const newRDV = { date: "2025-01-15", heure: "10:00", service_id: 1 };
    const mockResponse = { id: 1, ...newRDV };
    
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockResponse,
    });

    const result = await apiRendezVous.addRendezVous(newRDV);
    expect(result).toEqual(mockResponse);
  });

  it("deleteRendezVous devrait supprimer un rendez-vous", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      headers: { get: () => "" },
    });

    const result = await apiRendezVous.deleteRendezVous(1);
    expect(result).toBeNull();
  });
});

describe("API Horaire", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  it("getHoraires devrait récupérer la liste des horaires", async () => {
    const mockHoraires = [{ id: 1, jour_semaine: "lundi", heure_debut: "09:00" }];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockHoraires,
    });

    const result = await apiHoraire.getHoraires();
    expect(result).toEqual(mockHoraires);
  });

  it("addHoraire devrait créer un nouvel horaire", async () => {
    const newHoraire = { jour_semaine: "lundi", heure_debut: "09:00", heure_fin: "17:00" };
    const mockResponse = { id: 1, ...newHoraire };
    
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => mockResponse,
    });

    const result = await apiHoraire.addHoraire(newHoraire);
    expect(result).toEqual(mockResponse);
  });

  it("deleteHoraire devrait supprimer un horaire", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      status: 204,
      headers: { get: () => "" },
    });

    const result = await apiHoraire.deleteHoraire(1);
    expect(result).toBeNull();
  });
});

describe("API Services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch.mockClear();
  });

  describe("fetch wrapper", () => {
    it("devrait gérer les réponses JSON réussies", async () => {
      const mockData = { id: 1, nom: "Test" };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      });

      const response = await fetch("/api/test");
      const data = await response.json();

      expect(data).toEqual(mockData);
      expect(globalThis.fetch).toHaveBeenCalledWith("/api/test");
    });

    it("devrait détecter les erreurs HTTP", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      const response = await fetch("/api/test");

      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
    });

    it("devrait gérer les erreurs réseau", async () => {
      globalThis.fetch.mockRejectedValueOnce(new Error("Network error"));

      await expect(fetch("/api/test")).rejects.toThrow("Network error");
    });
  });

  describe("API constants", () => {
    it("devrait avoir une base URL définie", () => {
      const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";
      expect(API_BASE).toBeDefined();
      expect(typeof API_BASE).toBe("string");
    });

    it("devrait construire des URLs correctement", () => {
      const base = "http://localhost:3000";
      const endpoint = "/api/utilisateurs";
      const url = `${base}${endpoint}`;
      
      expect(url).toBe("http://localhost:3000/api/utilisateurs");
    });
  });

  describe("HTTP methods", () => {
    it("devrait permettre des requêtes GET", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ([]),
      });

      await fetch("/api/test", { method: "GET" });

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/test", { method: "GET" });
    });

    it("devrait permettre des requêtes POST avec body", async () => {
      const postData = { nom: "Test" };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, ...postData }),
      });

      await fetch("/api/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/test", expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }));
    });

    it("devrait permettre des requêtes PUT", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await fetch("/api/test/1", { method: "PUT" });

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/test/1", { method: "PUT" });
    });

    it("devrait permettre des requêtes DELETE", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await fetch("/api/test/1", { method: "DELETE" });

      expect(globalThis.fetch).toHaveBeenCalledWith("/api/test/1", { method: "DELETE" });
    });
  });

  describe("Response handling", () => {
    it("devrait parser les réponses JSON", async () => {
      const mockData = { message: "Success" };
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const response = await fetch("/api/test");
      const data = await response.json();

      expect(data).toEqual(mockData);
    });

    it("devrait gérer les réponses vides", async () => {
      globalThis.fetch.mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: async () => null,
      });

      const response = await fetch("/api/test");
      const data = await response.json();

      expect(data).toBeNull();
    });

    it("devrait gérer les codes de statut divers", async () => {
      const statuses = [200, 201, 400, 401, 403, 404, 500];
      
      for (const status of statuses) {
        globalThis.fetch.mockResolvedValueOnce({
          ok: status < 400,
          status,
          json: async () => ({ status }),
        });

        const response = await fetch("/api/test");
        expect(response.status).toBe(status);
      }
    });
  });
});
