import { httpJson, buildUrl, apiRequest, emptyToNull } from "httpClient.js";

const API_URL =
  import.meta.env.VITE_API_URL?.replace("/utilisateurs", "/rendezVous") ||
  "http://localhost:3000/api/rendezVous";

// Helpers spécifiques rendez-vous
const buildRdvUrl = (path = "") => buildUrl(API_URL, path);

const buildRdvPayload = (rdv) => ({
  client_id: rdv.client_id,
  employe_id: rdv.employe_id,
  date_rdv: rdv.date_rdv,   // "YYYY-MM-DD"
  heure_rdv: rdv.heure_rdv, // "HH:mm"
  description_probleme: emptyToNull(rdv.description_probleme ?? null),
});

// GET /api/rendezVous
export async function getRendezVous() {
  return httpJson(buildRdvUrl());
}

// GET /api/rendezVous/:id
export async function getRendezVousById(id) {
  return httpJson(buildRdvUrl(`/${id}`));
}

// POST /api/rendezVous
export async function addRendezVous(rdv) {
  return apiRequest(API_URL, "POST", "", buildRdvPayload(rdv));
}

// PUT /api/rendezVous/:id
export async function updateRendezVous(id, rdv) {
  return apiRequest(API_URL, "PUT", `/${id}`, buildRdvPayload(rdv));
}

// DELETE /api/rendezVous/:id
export async function deleteRendezVous(id) {
  return apiRequest(API_URL, "DELETE", `/${id}`);
}

// GET /api/rendezVous/employe/:employeId
export async function getRendezVousByEmploye(employeId) {
  return httpJson(
    buildRdvUrl(`/employe/${encodeURIComponent(employeId)}`)
  );
}

// GET /api/rendezVous/client/:clientId
export async function getRendezVousByClient(clientId) {
  return httpJson(
    buildRdvUrl(`/client/${encodeURIComponent(clientId)}`)
  );
}
