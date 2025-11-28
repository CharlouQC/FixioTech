backend\controleurs\controleurRendezVous.js [37:50]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\controleurs\controleurUtilisateur.js [152:166]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



