/**
 * À partir d'une date ISO (YYYY-MM-DD), retourne les noms de colonnes
 * d'horaire à utiliser (lundi_debut, lundi_fin, etc.).
 */
export function colonnesJour(dateISO) {
  // 0 = dimanche .. 6 = samedi
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

/**
 * Base commune de la requête qui trouve les employés disponibles
 * pour un créneau donné (date + heure).
 *
 * @param {string} debutCol  ex: "lundi_debut"
 * @param {string} finCol    ex: "lundi_fin"
 * @param {string} selectColumns  ex: "u.id" ou "u.id, u.email, ..."
 */
export function baseDisponibiliteQuery(
  debutCol,
  finCol,
  selectColumns = "u.id, u.email, u.nom_complet, u.role"
) {
  return `
    SELECT ${selectColumns}
    FROM utilisateurs u
    JOIN horaires h ON h.employe_id = u.id
    LEFT JOIN rendez_vous r
      ON r.employe_id = u.id AND r.date_rdv = $1 AND r.heure_rdv = $2
    WHERE u.role = 'employe'
      AND h.${debutCol} IS NOT NULL
      AND h.${finCol}   IS NOT NULL
      AND h.${debutCol} <= $3
      AND $4 < h.${finCol}
      AND r.id IS NULL
  `;
}