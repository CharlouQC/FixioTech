import db from "../config/databaseConnexion.js";

const getRendezVous = async (req, res, next) => {
    db.query('SELECT * FROM rendez_vous', (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
};

const getRendezVousById = async (req, res, next) => {
    const { id } = req.params;
    db.query('SELECT * FROM rendez_vous WHERE id = ?', [id], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        res.json(results[0]);
    });
};

const addRendezVous = async (req, res, next) => {
  const { client_id, employe_id, date_rdv, heure_rdv } = req.body;
  const description_probleme = emptyToNull(req.body.description_probleme);

  const sql = `
    INSERT INTO rendez_vous
      (client_id, employe_id, date_rdv, heure_rdv, description_probleme)
    VALUES (?, ?, ?, ?, ?)
  `;
  const params = [client_id, employe_id, date_rdv, heure_rdv, description_probleme];

  db.query(sql, params, (err, results) => {
    if (err) return next(err);
    res
      .status(201)
      .json({ id: results.insertId, client_id, employe_id, date_rdv, heure_rdv, description_probleme });
  });
};

const updateRendezVous = async (req, res, next) =>  {
  const { id } = req.params;
  const { client_id, employe_id, date_rdv, heure_rdv } = req.body;
  const description_probleme = emptyToNull(req.body.description_probleme);

  const sql = `
    UPDATE rendez_vous
    SET client_id = ?, employe_id = ?, date_rdv = ?, heure_rdv = ?, description_probleme = ?
    WHERE id = ?
  `;
  const params = [client_id, employe_id, date_rdv, heure_rdv, description_probleme, id];

  db.query(sql, params, (err, results) => {
    if (err) return next(err);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.status(200).json({ id, client_id, employe_id, date_rdv, heure_rdv, description_probleme });
  });
};

const deleteRendezVous = async (req, res, next) => {
    const { id } = req.params;

    db.query('DELETE FROM rendez_vous WHERE id = ?', [id], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
    });
};

export { getRendezVous, getRendezVousById, addRendezVous, updateRendezVous, deleteRendezVous };