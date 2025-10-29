import express from 'express';

import { 
    getRendezVous, 
    getRendezVousById, 
    addRendezVous, 
    updateRendezVous, 
    deleteRendezVous
} from '../controleurs/controleurRendezVous.js';

import {
    addRendezVousValidation,
    updateRendezVousValidation,
} from '../validateurs/validateurRendezVous.js';

const routerRendezVous = express.Router();

routerRendezVous.post('/', addRendezVousValidation, addRendezVous);
routerRendezVous.get('/', getRendezVous);
routerRendezVous.get('/:id', getRendezVousById);
routerRendezVous.put('/:id', updateRendezVousValidation, updateRendezVous);
routerRendezVous.delete('/:id', deleteRendezVous);

export default routerRendezVous;