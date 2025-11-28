frontend\services\apiRendezVous.js [57:63]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const payload = {
    client_id: rdv.client_id,
    employe_id: rdv.employe_id,
    date_rdv: rdv.date_rdv, // "YYYY-MM-DD"
    heure_rdv: rdv.heure_rdv, // "HH:mm"
    description_probleme: emptyToNull(rdv.description_probleme ?? null),
  };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend\services\apiRendezVous.js [73:79]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const payload = {
    client_id: rdv.client_id,
    employe_id: rdv.employe_id,
    date_rdv: rdv.date_rdv,
    heure_rdv: rdv.heure_rdv,
    description_probleme: emptyToNull(rdv.description_probleme ?? null),
  };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



