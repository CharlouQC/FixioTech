import { db } from "../config/databaseConnexion.js";

// -----------------------------------------------------------------------------
// Helpers génériques
// -----------------------------------------------------------------------------

function runQuery(sql, params, next, onSuccess) {
  db.query(sql, params, (err, results) => {
    if (err) {
      return next(err);
    }
    onSuccess(results);
  });
}

/**
 * Helper pour récupérer un horaire unique selon une clause WHERE.
 * - whereClause : chaîne du type "id = $1" ou "employe_id = $1"
 * - params : tableau de paramètres pour la requête
 * - options.allowNull :
 *      - false  -> 404 si aucun horaire
 *      - true   -> 200 avec `null` si aucun horaire
 */
function findHoraire(whereClause, params, next, res, { allowNull = false } = {}) {
  const sql = `SELECT * FROM horaires WHERE ${whereClause}`;

  runQuery(sql, params, next, (results) => {
    const rows = results.rows;
    if (rows.length === 0) {
      if (allowNull) {
        return res.status(200).json(null);
      }
      return res.status(404).json({ message: "Horaire non trouvé" });
    }
    res.json(rows[0]);
  });
}

// -----------------------------------------------------------------------------
// Gestion des colonnes d'horaires (jours de la semaine)
// -----------------------------------------------------------------------------

const JOUR_COLS = [
  "lundi_debut", "lundi_fin",
  "mardi_debut", "mardi_fin",
  "mercredi_debut", "mercredi_fin",
  "jeudi_debut", "jeudi_fin",
  "vendredi_debut", "vendredi_fin",
  "samedi_debut", "samedi_fin",
  "dimanche_debut", "dimanche_fin",
];

function buildHoraireParamsFromBody(body) {
  return JOUR_COLS.map((col) => body[col]);
}

// -----------------------------------------------------------------------------
// Contrôleurs
// -----------------------------------------------------------------------------

const getHoraires = async (req, res, next) => {
  runQuery("SELECT * FROM horaires", [], next, (results) => {
    res.json(results.rows);
  });
};

const getHoraireById = async (req, res, next) => {
  const { id } = req.params;
  findHoraire("id = $1", [id], next, res);
};

const addHoraire = async (req, res, next) => {
  const { employe_id } = req.body;

  if (!employe_id) {
    return res.status(400).json({ message: "Champs requis manquant" });
  }

  const jourParams = buildHoraireParamsFromBody(req.body);

  const sql = `
    INSERT INTO horaires (
      employe_id,
      ${JOUR_COLS.join(", ")}
    )
    VALUES (
      $1, ${JOUR_COLS.map((_, i) => `$${i + 2}`).join(", ")}
    )
    RETURNING *
  `;

  const params = [employe_id, ...jourParams];

  runQuery(sql, params, next, (results) => {
    const row = results.rows[0];
    res.status(201).json(row);
  });
};

const updateHoraire = async (req, res, next) => {
  const { id } = req.params;
  const { employe_id } = req.body;

  const jourParams = buildHoraireParamsFromBody(req.body);

  const setJourCols = JOUR_COLS
    .map((col, i) => `${col} = $${i + 2}`)
    .join(", ");

  const sql = `
    UPDATE horaires
    SET
      employe_id = $1,
      ${setJourCols}
    WHERE id = $${JOUR_COLS.length + 2}
    RETURNING *
  `;

  const params = [employe_id, ...jourParams, id];

  runQuery(sql, params, next, (results) => {
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }
    res.status(200).json(results.rows[0]);
  });
};

const deleteHoraire = async (req, res, next) => {
  const { id } = req.params;

  const sql = "DELETE FROM horaires WHERE id = $1";

  runQuery(sql, [id], next, (results) => {
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }
    res.status(200).json({ message: "Horaire supprimé avec succès" });
  });
};

const getHoraireByEmployeId = async (req, res, next) => {
  const { employeId } = req.params;
  // Comportement original : renvoyer 200 + null si aucun horaire
  findHoraire("employe_id = $1", [employeId], next, res, { allowNull: true });
};

export {
  getHoraires, getHoraireById, addHoraire, updateHoraire, deleteHoraire, getHoraireByEmployeId,
};