import { httpJson, buildUrl, apiRequest } from "httpClient.js";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/utilisateurs", "/horaires") ||
  "http://localhost:3000/api/horaires";

const buildHoraireUrl = (path = "") => buildUrl(API_URL, path);

const buildHorairePayload = (horaire) => ({
  employe_id: horaire.employe_id,
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

// GET /api/horaires
export async function getHoraires() {
  return httpJson(buildHoraireUrl());
}

// GET /api/horaires/:id
export async function getHoraire(id) {
  return httpJson(buildHoraireUrl(`/${id}`));
}

// POST /api/horaires
export async function addHoraire(horaire) {
  return apiRequest(API_URL, "POST", "", buildHorairePayload(horaire));
}

// PUT /api/horaires/:id
export async function updateHoraire(id, horaire) {
  return apiRequest(API_URL, "PUT", `/${id}`, buildHorairePayload(horaire));
}

// DELETE /api/horaires/:id
export async function deleteHoraire(id) {
  return apiRequest(API_URL, "DELETE", `/${id}`);
}

// GET /api/horaires/employe/:employeId
export async function getHoraireByEmploye(employeId) {
  return httpJson(
    buildHoraireUrl(`/employe/${encodeURIComponent(employeId)}`)
  );
}

export async function saveHoraireForEmploye(horaire) {
  if (horaire.id) {
    return updateHoraire(horaire.id, horaire);
  }
  return addHoraire(horaire);
}