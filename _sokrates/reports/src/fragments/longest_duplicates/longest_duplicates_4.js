frontend\services\apiRendezVous.js [5:39]:
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
        // Ignore JSON parsing errors
      }
    } else {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {
        // Ignore text parsing errors
      }
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  if (contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    return text || null;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend\services\apiUtilisateur.js [4:38]:
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
        // Ignore JSON parsing errors
      }
    } else {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {
        // Ignore text parsing errors
      }
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;

  if (contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    return text || null;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



