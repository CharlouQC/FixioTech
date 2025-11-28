backend\validateurs\validateurRendezVous.js [10:19]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    .matches(timeRe)
    .withMessage("Heure de rendez-vous invalide"),
  body("description_probleme")
    .optional()
    .isString()
    .withMessage("Description du problème invalide")
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Description trop longue (max 5000)."),
];
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\validateurs\validateurRendezVous.js [30:39]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    .matches(timeRe)
    .withMessage("Heure de rendez-vous invalide"),
  body("description_probleme")
    .optional()
    .isString()
    .withMessage("Description du problème invalide")
    .trim()
    .isLength({ max: 5000 })
    .withMessage("Description trop longue (max 5000)."),
];
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



