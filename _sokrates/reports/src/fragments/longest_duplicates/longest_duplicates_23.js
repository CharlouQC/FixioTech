backend\controleurs\controleurRendezVous.js [35:49]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};

function colonnesJour(dateISO) {
  const j = new Date(`${dateISO}T00:00:00`).getDay();
  const noms = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const jour = noms[j];
  return { debutCol: `${jour}_debut`, finCol: `${jour}_fin` };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\controleurs\controleurUtilisateur.js [150:165]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
};

function colonnesJour(dateISO) {
  // 0=dimanche .. 6=samedi
  const j = new Date(`${dateISO}T00:00:00`).getDay();
  const noms = [
    "dimanche",
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
  ];
  const jour = noms[j];
  return { debutCol: `${jour}_debut`, finCol: `${jour}_fin` };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



