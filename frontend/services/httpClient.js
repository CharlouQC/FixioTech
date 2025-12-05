// Client HTTP générique pour le frontend

export async function httpJson(url, options = {}) {
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
        // Si le JSON plante, on essaie au moins de lire le texte brut
        try {
          const text = await res.text();
          if (text) message = text;
        } catch {
          // Ignore text parsing errors
        }
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
  }
}

// Normalise les URLs basées sur une base
export const buildUrl = (baseUrl, path = "") =>
  path ? `${baseUrl}${path.startsWith("/") ? path : `/${path}`}` : baseUrl;

// Wrapper pour factoriser méthode + body JSON
export const apiRequest = (baseUrl, method, path = "", body) =>
  httpJson(buildUrl(baseUrl, path), {
    method,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

// Petit utilitaire commun
export const emptyToNull = (v) => (v === "" ? null : v);