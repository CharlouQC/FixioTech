import { httpJson, buildUrl, apiRequest } from "./httpClient.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/utilisateurs";

const buildUserUrl = (path = "") => buildUrl(API_URL, path);

async function getUtilisateurs() {
  return httpJson(buildUserUrl());
}

async function getUtilisateur(id) {
  return httpJson(buildUserUrl(`/${id}`));
}

async function addUtilisateur(utilisateur) {
  const payload = {
    email: utilisateur.courriel,
    mot_de_passe: utilisateur.mot_de_passe,
    nom_complet: utilisateur.nom_complet,
    role: utilisateur.role || "client",
  };

  return apiRequest(API_URL, "POST", "", payload);
}

async function loginUtilisateur(utilisateur) {
  const payload = {
    email: utilisateur.courriel,
    mot_de_passe: utilisateur.mot_de_passe,
  };

  return apiRequest(API_URL, "POST", "/login", payload);
}

async function updateUtilisateur(id, updates) {
  return apiRequest(API_URL, "PUT", `/${id}`, updates);
}

async function deleteUtilisateur(id) {
  return apiRequest(API_URL, "DELETE", `/${id}`);
}

async function getEmployes() {
  return httpJson(buildUserUrl("?role=employe"));
}

async function getEmployesDisponibles(dateISO, heureHHmm, service) {
  const qs = new URLSearchParams({ date: dateISO, heure: heureHHmm, service });
  return httpJson(buildUserUrl(`/disponibles?${qs.toString()}`));
}

async function getEmployesParService(service) {
  const qs = new URLSearchParams({ service });
  return httpJson(buildUserUrl(`/par-service?${qs.toString()}`));
}

export {
  getUtilisateurs,
  getUtilisateur,
  addUtilisateur,
  loginUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  getEmployes,
  getEmployesDisponibles,
  getEmployesParService,
};
