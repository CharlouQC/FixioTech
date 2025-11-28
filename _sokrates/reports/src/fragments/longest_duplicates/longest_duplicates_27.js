frontend\services\apiHoraire.js [19:36]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        try {
          const text = await res.text();
          if (text) message = text;
        } catch {
          // Ignore text parsing errors
        }
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



frontend\services\apiUtilisateur.js [22:38]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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



