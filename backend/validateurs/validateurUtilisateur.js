import { body } from "express-validator";

const addUtilisateurValidation = [
    body("nom").notEmpty().withMessage("Le nom est requis"),
    body("email").isEmail().withMessage("Email invalide"),
    body("mot_de_passe").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
]

const updateUtilisateurValidation = [
    body("nom").optional().notEmpty().withMessage("Le nom ne peut pas être vide"),
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("mot_de_passe").optional().isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
]

export { addUtilisateurValidation, updateUtilisateurValidation, };