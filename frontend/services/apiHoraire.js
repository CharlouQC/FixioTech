import { httpJson, buildUrl, apiRequest } from "./httpClient.js";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/utilisateurs", "/horaires") ||
  "http://localhost:3000/api/horaires";

const buildHoraireUrl = (path = "") => buildUrl(API_URL, path);

const buildHorairePayload = (horaire) => ({
  employe_id: horaire.employe_id,

  // ✅ JSONB: tableau de strings
  services_proposes: Array.isArray(horaire.services_proposes)
    ? horaire.services_proposes
    : [],

  lundi_debut: horaire.lundi_debut ?? null,
  lundi_fin: horaire.lundi_fin ?? null,
  mardi_debut: horaire.mardi_debut ?? null,
  mardi_fin: horaire.mardi_fin ?? null,
  mercredi_debut: horaire.mercredi_debut ?? null,
  mercredi_fin: horaire.mercredi_fin ?? null,
  jeudi_debut: horaire.jeudi_debut ?? null,
  jeudi_fin: horaire.jeudi_fin ?? null,
  vendredi_debut: horaire.vendredi_debut ?? null,
  vendredi_fin: horaire.vendredi_fin ?? null,
  samedi_debut: horaire.samedi_debut ?? null,
  samedi_fin: horaire.samedi_fin ?? null,
  dimanche_debut: horaire.dimanche_debut ?? null,
  dimanche_fin: horaire.dimanche_fin ?? null,
});

export async function getHoraires() {
  return httpJson(buildHoraireUrl());
}

export async function getHoraire(id) {
  return httpJson(buildHoraireUrl(`/${id}`));
}

export async function addHoraire(horaire) {
  return apiRequest(API_URL, "POST", "", buildHorairePayload(horaire));
}

export async function updateHoraire(id, horaire) {
  return apiRequest(API_URL, "PUT", `/${id}`, buildHorairePayload(horaire));
}

export async function deleteHoraire(id) {
  return apiRequest(API_URL, "DELETE", `/${id}`);
}

export async function getHoraireByEmploye(employeId) {
  return httpJson(buildHoraireUrl(`/employe/${encodeURIComponent(employeId)}`));
}

export async function saveHoraireForEmploye(horaire) {
  if (horaire.id) return updateHoraire(horaire.id, horaire);
  return addHoraire(horaire);
}
