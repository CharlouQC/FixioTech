import express from 'express';

import { 
    getUtilisateurs, 
    getUtilisateurById, 
    addUtilisateur, 
    updateUtilisateur, 
    deleteUtilisateur 
} from '../controleurs/controleurUtilisateur.js';

import {
    addUtilisateurValidation,
    updateUtilisateurValidation,
} from '../validateurs/validateurUtilisateur.js';

const routerUtilisateur = express.Router();

routerUtilisateur.post('/', addUtilisateurValidation, addUtilisateur);
routerUtilisateur.get('/', getUtilisateurs);
routerUtilisateur.get('/:id', getUtilisateurById);
routerUtilisateur.put('/:id', updateUtilisateurValidation, updateUtilisateur);
routerUtilisateur.delete('/:id', deleteUtilisateur);

export default routerUtilisateur;