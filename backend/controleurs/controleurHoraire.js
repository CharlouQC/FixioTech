import { db } from "../config/databaseConnexion.js";

const getHoraires = async (req, res, next) => {
  db.query("SELECT * FROM horaires", [], (err, results) => {
    if (err) {
      return next(err);
    }
    res.json(results.rows);
  });
};

const getHoraireById = async (req, res, next) => {
  const { id } = req.params;

  db.query("SELECT * FROM horaires WHERE id = $1", [id], (err, results) => {
    if (err) {
      return next(err);
    }
    const rows = results.rows;
    if (rows.length === 0) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }
    res.json(rows[0]);
  });
};

const addHoraire = async (req, res, next) => {
  const {
    employe_id,
    lundi_debut,
    lundi_fin,
    mardi_debut,
    mardi_fin,
    mercredi_debut,
    mercredi_fin,
    jeudi_debut,
    jeudi_fin,
    vendredi_debut,
    vendredi_fin,
    samedi_debut,
    samedi_fin,
    dimanche_debut,
    dimanche_fin,
  } = req.body;

  if (!employe_id) {
    return res.status(400).json({ message: "Champs requis manquant" });
  }

  const sql = `
    INSERT INTO horaires (
      employe_id,
      lundi_debut, lundi_fin,
      mardi_debut, mardi_fin,
      mercredi_debut, mercredi_fin,
      jeudi_debut, jeudi_fin,
      vendredi_debut, vendredi_fin,
      samedi_debut, samedi_fin,
      dimanche_debut, dimanche_fin
    )
    VALUES (
      $1, $2, $3, $4, $5,
      $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15
    )
    RETURNING *
  `;

  const params = [
    employe_id,
    lundi_debut,
    lundi_fin,
    mardi_debut,
    mardi_fin,
    mercredi_debut,
    mercredi_fin,
    jeudi_debut,
    jeudi_fin,
    vendredi_debut,
    vendredi_fin,
    samedi_debut,
    samedi_fin,
    dimanche_debut,
    dimanche_fin,
  ];

  db.query(sql, params, (err, results) => {
    if (err) {
      return next(err);
    }
    const row = results.rows[0];
    res.status(201).json(row);
  });
};

const updateHoraire = async (req, res, next) => {
  const { id } = req.params;
  const {
    employe_id,
    lundi_debut,
    lundi_fin,
    mardi_debut,
    mardi_fin,
    mercredi_debut,
    mercredi_fin,
    jeudi_debut,
    jeudi_fin,
    vendredi_debut,
    vendredi_fin,
    samedi_debut,
    samedi_fin,
    dimanche_debut,
    dimanche_fin,
  } = req.body;

  const sql = `
    UPDATE horaires
    SET
      employe_id = $1,
      lundi_debut = $2,  lundi_fin = $3,
      mardi_debut = $4,  mardi_fin = $5,
      mercredi_debut = $6, mercredi_fin = $7,
      jeudi_debut = $8,  jeudi_fin = $9,
      vendredi_debut = $10, vendredi_fin = $11,
      samedi_debut = $12, samedi_fin = $13,
      dimanche_debut = $14, dimanche_fin = $15
    WHERE id = $16
    RETURNING *
  `;

  const params = [
    employe_id,
    lundi_debut,
    lundi_fin,
    mardi_debut,
    mardi_fin,
    mercredi_debut,
    mercredi_fin,
    jeudi_debut,
    jeudi_fin,
    vendredi_debut,
    vendredi_fin,
    samedi_debut,
    samedi_fin,
    dimanche_debut,
    dimanche_fin,
    id,
  ];

  db.query(sql, params, (err, results) => {
    if (err) {
      return next(err);
    }
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }
    res.status(200).json(results.rows[0]);
  });
};

const deleteHoraire = async (req, res, next) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM horaires WHERE id = $1",
    [id],
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.rowCount === 0) {
        return res.status(404).json({ message: "Horaire non trouvé" });
      }
      res.status(200).json({ message: "Horaire supprimé avec succès" });
    }
  );
};

const getHoraireByEmployeId = async (req, res, next) => {
  const { employeId } = req.params;

  db.query(
    "SELECT * FROM horaires WHERE employe_id = $1",
    [employeId],
    (err, results) => {
      if (err) return next(err);
      const rows = results.rows;
      if (rows.length === 0) return res.status(200).json(null);
      res.json(rows[0]);
    }
  );
};

export {
  getHoraires,
  getHoraireById,
  addHoraire,
  updateHoraire,
  deleteHoraire,
  getHoraireByEmployeId,
};