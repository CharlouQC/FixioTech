import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./client.css";
import { useAuth } from "../context/AuthContext";
import { getRendezVousByClient } from "../../services/apiRendezVous";
import { getEmployes } from "../../services/apiUtilisateur";

const Client = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [rdvs, setRdvs] = useState([]);
  const [error, setError] = useState("");
  const [employesMap, setEmployesMap] = useState({}); // { [id]: employé }

  const fmtDate = useCallback((isoDate) => {
    if (typeof isoDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
      return isoDate; // évite les décalages de fuseau
    }
    try {
      const d = new Date(isoDate);
      return Number.isNaN(d.getTime())
        ? String(isoDate ?? "")
        : d.toLocaleDateString();
    } catch {
      return String(isoDate ?? "");
    }
  }, []);

  const clientId =
    user?.id ??
    user?.client_id ??
    user?.utilisateur_id ??
    user?.id_utilisateur ??
    null;

  useEffect(() => {
    let cancelled = false;
    if (!clientId) {
      setLoading(false);
      setRdvs([]);
      setEmployesMap({});
      return;
    }

    (async () => {
      setLoading(true);
      setError("");
      try {
        const [rdvList, employes] = await Promise.all([
          getRendezVousByClient(clientId),
          getEmployes(),
        ]);

        if (cancelled) return;

        console.debug("[Client] clientId=", clientId, "RDV reçus=", rdvList);
        setRdvs(Array.isArray(rdvList) ? rdvList : []);

        const map = {};
        (Array.isArray(employes) ? employes : []).forEach((e) => {
          if (e?.id != null) map[e.id] = e;
        });
        setEmployesMap(map);
      } catch (err) {
        if (!cancelled) {
          console.error("[Client] Erreur chargement RDV:", err);
          setError(err?.message || String(err));
          setRdvs([]);
          setEmployesMap({});
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [clientId]);

  const contenu = useMemo(() => {
    if (loading) {
      return (
        <div className="client-loading">Chargement de vos rendez-vous…</div>
      );
    }
    if (error) {
      return <div className="client-error">{error}</div>;
    }
    if (!rdvs.length) {
      return (
        <div className="client-empty">
          Vous n’avez pas encore de rendez-vous.
        </div>
      );
    }

    const aujourdhui = new Date();
    aujourdhui.setHours(0, 0, 0, 0);
    
    return (
      <div className="client-rdv-liste">
        {rdvs.map((r) => {
          const tech = employesMap[r.employe_id];
          const techLabel =
            tech?.nom_complet || tech?.email || `Technicien #${r.employe_id}`;

          // Si le rendez-vous est "Programmé" mais la date est passée, le considérer comme "Terminé"
          let statut = r.statut || "Programmé";
          if (statut === "Programmé" || statut === "Programmθ") {
            // Extraire la partie date YYYY-MM-DD de la chaîne ISO
            const dateStr = typeof r.date_rdv === 'string' 
              ? r.date_rdv.split('T')[0] 
              : r.date_rdv;
            const dateRdv = new Date(dateStr + "T00:00:00");
            if (dateRdv < aujourdhui) {
              statut = "Terminé";
            }
          }

          return (
            <div key={r.id} className="client-rdv-card">
              <div className="client-rdv-header">
                <div className="client-rdv-id">RDV #{r.id}</div>
                <div
                  className={`client-statut-badge client-statut-${statut.toLowerCase()}`}
                >
                  {statut}
                </div>
              </div>

              <div className="client-rdv-body">
                <div className="client-rdv-row">
                  <div className="client-rdv-item">
                    <div className="label">Date</div>
                    <div className="value">{fmtDate(r.date_rdv)}</div>
                  </div>
                  <div className="client-rdv-item">
                    <div className="label">Heure</div>
                    <div className="value">{r.heure_rdv || "—"}</div>
                  </div>
                </div>

                <div className="client-rdv-row">
                  <div className="client-rdv-item">
                    <div className="label">Service</div>
                    <div className="value">{r.service || "Non spécifié"}</div>
                  </div>
                  <div className="client-rdv-item">
                    <div className="label">Technicien assigné</div>
                    <div className="value">{techLabel}</div>
                  </div>
                </div>

                {r.description_probleme ? (
                  <div className="client-rdv-desc">
                    <div className="label">Description</div>
                    <p className="value">{r.description_probleme}</p>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [loading, error, rdvs, employesMap, fmtDate]);

  return (
    <div className="client-container">
      <div className="client-header">
        <h1>Mes rendez-vous</h1>
        <p className="client-intro">
          Consultez ici vos rendez-vous et leur statut.
        </p>
      </div>

      {contenu}
    </div>
  );
};

export default Client;
