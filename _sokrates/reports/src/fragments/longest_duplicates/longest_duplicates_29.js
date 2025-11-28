backend\controleurs\controleurRendezVous.js [71:80]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    FROM utilisateurs u
    JOIN horaires h ON h.employe_id = u.id
    LEFT JOIN rendez_vous r
      ON r.employe_id = u.id AND r.date_rdv = ? AND r.heure_rdv = ?
    WHERE u.role = 'employe'
      AND h.${debutCol} IS NOT NULL
      AND h.${finCol}   IS NOT NULL
      AND h.${debutCol} <= ?
      AND ? < h.${finCol}
      AND r.id IS NULL
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\controleurs\controleurUtilisateur.js [180:189]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    FROM utilisateurs u
    JOIN horaires h ON h.employe_id = u.id
    LEFT JOIN rendez_vous r
      ON r.employe_id = u.id AND r.date_rdv = ? AND r.heure_rdv = ?
    WHERE u.role = 'employe'
      AND h.${debutCol} IS NOT NULL
      AND h.${finCol}   IS NOT NULL
      AND h.${debutCol} <= ?
      AND ? < h.${finCol}
      AND r.id IS NULL
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



