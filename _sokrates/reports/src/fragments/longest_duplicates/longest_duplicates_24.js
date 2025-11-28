frontend\services\apiHoraire.js [3:17]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function httpJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    let message = `Erreur HTTP ${res.status}`;
    if (contentType.includes("application/json")) {
      try {
        const body = await res.json();
        message = body?.message || message;
      } catch {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend\services\apiUtilisateur.js [4:18]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function httpJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    let message = `Erreur HTTP ${res.status}`;
    if (contentType.includes("application/json")) {
      try {
        const body = await res.json();
        message = body?.message || message;
      } catch {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



