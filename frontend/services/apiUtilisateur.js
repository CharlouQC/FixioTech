const API_URL = 'http://localhost:5000/api/utilisateurs';

async function httpJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const contentType = res.headers.get("content-type") || "";

  // Cas erreur HTTP : essaye d'extraire un message JSON, sinon texte brut
  if (!res.ok) {
    let message = `Erreur HTTP ${res.status}`;
    if (contentType.includes("application/json")) {
      try {
        const body = await res.json();
        message = body?.message || message;
      } catch {}
    } else {
      try {
        const text = await res.text();
        if (text) message = text;
      } catch {}
    }
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return null;

  // Succès : ne parser en JSON que si c'est du JSON; sinon renvoyer le texte
  if (contentType.includes("application/json")) {
    return res.json();
  } else {
    const text = await res.text();
    return text || null;
  }
}

async function getUtilisateurs() {
    // TODO
}

async function getUtilisateur(id) {
    // TODO
}

async function addUtilisateur(utilisateur) {
    const payload = {
        email: utilisateur.courriel,         
        mot_de_passe: utilisateur.mot_de_passe, 
    };
    return httpJson(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

async function loginUtilisateur(id, utilisateur) {
    const payload = {
        email: utilisateur.courriel,         
        mot_de_passe: utilisateur.mot_de_passe, 
    };
    return httpJson(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export { getUtilisateurs, getUtilisateur, addUtilisateur, loginUtilisateur };