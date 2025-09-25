import db from "../config/databaseConnexion.js";

const getUtilisateurs = async (req, res, next) => {
    db.query('SELECT id, email FROM utilisateurs', (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
};

const getUtilisateurById = async (req, res, next) => {
    const { id } = req.params;
    db.query('SELECT id, email FROM utilisateurs WHERE id = ?', [id], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.json(results[0]);
    });
};

const addUtilisateur = async (req, res, next) => {
    const { nom, email, mot_de_passe } = req.body;

    if (!nom || !email || !mot_de_passe) {
        return res.status(400).json({ message: 'Champs requis manquant' });
    }

    db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)', 
    [nom, email, mot_de_passe], (err, results) => {
        if (err) {
            return next(err);
        }
        res.status(201).json({ id: results.insertId, nom, email });
    });
};

const updateUtilisateur = async (req, res, next) =>  {
        const { id } = req.params;
    const { nom, email, mot_de_passe } = req.body;

    db.query('UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = ? WHERE id = ?', 
    [nom, email, mot_de_passe, id], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ id, nom, email });
    });
};

const deleteUtilisateur = async (req, res, next) => {
    const { id } = req.params;

    db.query('DELETE FROM utilisateurs WHERE id = ?', [id], (err, results) => {
        if (err) {
            return next(err);
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    });
};

export { getUtilisateurs, getUtilisateurById, addUtilisateur, updateUtilisateur, deleteUtilisateur };