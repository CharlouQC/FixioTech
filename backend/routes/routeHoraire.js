import express from 'express';

import {
    getHoraires,
    getHoraireById,
    addHoraire,
    updateHoraire,
    deleteHoraire
} from '../controleurs/controleurHoraire.js';

import {
    addHoraireValidation,
    updateHoraireValidation
} from '../validateurs/validateurHoraire.js';

const routerHoraire = express.Router();

routerHoraire.get('/', getHoraires);
routerHoraire.get('/:id', getHoraireById);
routerHoraire.post('/', addHoraireValidation, addHoraire);
routerHoraire.put('/:id', updateHoraireValidation, updateHoraire);
routerHoraire.delete('/:id', deleteHoraire);

export default routerHoraire;