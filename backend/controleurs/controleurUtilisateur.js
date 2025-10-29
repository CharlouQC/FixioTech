import db from "../config/databaseConnexion.js";

const getUtilisateurs = async (req, res, next) => {
    db.query('SELECT id, email, nom_complet, role FROM utilisateurs', (err, results) => {
        if (err) {
            return next(err);
        }
        res.json(results);
    });
};

const getUtilisateurById = async (req, res, next) => {
    const { id } = req.params;
    db.query('SELECT id, email, nom_complet, role FROM utilisateurs WHERE id = ?', [id], (err, results) => {
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
    const {email, mot_de_passe, nom_complet, role = 'client' } = req.body;

    if (!email || !mot_de_passe || !nom_complet) {
        return res.status(400).json({ message: 'Champs requis manquants' });
    }

    db.query(
        'INSERT INTO utilisateurs (email, mot_de_passe, nom_complet, role) VALUES (?, ?, ?, ?)', 
        [email, mot_de_passe, nom_complet, role],
        (err, results) => {
            if (err) {
                return next(err);
            }
            res.status(201).json({ 
                id: results.insertId, 
                email,
                nom_complet,
                role 
            });
        }
    );
};

const updateUtilisateur = async (req, res, next) =>  {
    const { id } = req.params;
    const { email, mot_de_passe, nom_complet, role } = req.body;

    const updateFields = [];
    const updateValues = [];

    if (email) {
        updateFields.push('email = ?');
        updateValues.push(email);
    }
    if (mot_de_passe) {
        updateFields.push('mot_de_passe = ?');
        updateValues.push(mot_de_passe);
    }
    if (nom_complet) {
        updateFields.push('nom_complet = ?');
        updateValues.push(nom_complet);
    }
    if (role) {
        updateFields.push('role = ?');
        updateValues.push(role);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ message: 'Aucun champ à mettre à jour' });
    }

    updateValues.push(id);

    db.query(
        `UPDATE utilisateurs SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues,
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.status(200).json({ 
                id, 
                ...(email && { email }),
                ...(nom_complet && { nom_complet }),
                ...(role && { role })
            });
        }
    );
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

const loginUtilisateur = async (req, res, next) => {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
        return res.status(400).json({ message: 'Champs requis manquants' });
    }

    db.query(
        'SELECT id, email, nom_complet, role FROM utilisateurs WHERE email = ? AND mot_de_passe = ?',
        [email, mot_de_passe],
        (err, results) => {
            if (err) {
                return next(err);
            }
            if (results.length === 0) {
                return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
            }
            res.status(200).json({ 
                message: 'Connexion réussie', 
                utilisateur: results[0] 
            });
        }
    );
};

export { 
    getUtilisateurs, 
    getUtilisateurById, 
    addUtilisateur, 
    updateUtilisateur, 
    deleteUtilisateur, 
    loginUtilisateur
};