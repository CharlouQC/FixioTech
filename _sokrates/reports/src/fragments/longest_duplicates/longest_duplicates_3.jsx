frontend\src\vues\rendez-vous.jsx [204:234]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
              <div className="no-tech">
                Aucun technicien disponible pour ce créneau.
              </div>
            ) : (
              <div className="techniciens-liste">
                {listeTechniciens.map((t) => (
                  <div
                    key={t.id}
                    className={`technicien-card ${
                      formData.technicien === String(t.id)
                        ? "technicien-selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData((f) => ({ ...f, technicien: String(t.id) }))
                    }
                  >
                    <div className="technicien-avatar">
                      {String(t.nom_complet || t.email || "T")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div className="technicien-info">
                      <h3>{t.nom_complet || "Technicien"}</h3>
                      <p>Support & Réparation</p>
                    </div>
                    {formData.technicien === String(t.id) && (
                      <div className="technicien-check">✓</div>
                    )}
                  </div>
                ))}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend\src\vues\rendez-vous.jsx [246:276]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            <div className="no-tech">
              Aucun technicien disponible pour ce créneau.
            </div>
          ) : (
            <div className="techniciens-liste">
              {listeTechniciens.map((t) => (
                <div
                  key={t.id}
                  className={`technicien-card ${
                    formData.technicien === String(t.id)
                      ? "technicien-selected"
                      : ""
                  }`}
                  onClick={() =>
                    setFormData((f) => ({ ...f, technicien: String(t.id) }))
                  }
                >
                  <div className="technicien-avatar">
                    {String(t.nom_complet || t.email || "T")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                  <div className="technicien-info">
                    <h3>{t.nom_complet || "Technicien"}</h3>
                    <p>Support & Réparation</p>
                  </div>
                  {formData.technicien === String(t.id) && (
                    <div className="technicien-check">✓</div>
                  )}
                </div>
              ))}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



