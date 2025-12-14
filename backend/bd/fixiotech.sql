-- ====================================================================
-- DB FixioTech — Version PostgreSQL (Render-friendly)
-- Script idempotent (si relancé, il ne casse rien)
-- ====================================================================

-- ====================================================================
-- TABLE utilisateurs
-- ====================================================================

DROP TABLE IF EXISTS rendez_vous CASCADE;
DROP TABLE IF EXISTS horaires CASCADE;
DROP TABLE IF EXISTS utilisateurs CASCADE;

CREATE TABLE utilisateurs (
    id      SERIAL PRIMARY KEY,
    email   VARCHAR(100) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    nom_complet  VARCHAR(100) NOT NULL,
    role    VARCHAR(10) NOT NULL CHECK (role IN ('client','employe','admin'))
        DEFAULT 'client'
);

-- ====================================================================
-- TABLE horaires (1 employé = 1 horaire)
-- ====================================================================

CREATE TABLE horaires (
    id SERIAL PRIMARY KEY,
    employe_id INT NOT NULL UNIQUE,

    lundi_debut TIME NULL,     lundi_fin TIME NULL,
    mardi_debut TIME NULL,     mardi_fin TIME NULL,
    mercredi_debut TIME NULL,  mercredi_fin TIME NULL,
    jeudi_debut TIME NULL,     jeudi_fin TIME NULL,
    vendredi_debut TIME NULL,  vendredi_fin TIME NULL,
    samedi_debut TIME NULL,    samedi_fin TIME NULL,
    dimanche_debut TIME NULL,  dimanche_fin TIME NULL,

    services_proposes JSONB NOT NULL DEFAULT '[]'::jsonb,

    CONSTRAINT fk_horaires_employe
        FOREIGN KEY (employe_id)
        REFERENCES utilisateurs(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ====================================================================
-- TABLE rendez_vous
-- ====================================================================

CREATE TABLE rendez_vous (
    id SERIAL PRIMARY KEY,
    client_id  INT NOT NULL,
    employe_id INT NOT NULL,
    date_rdv   DATE NOT NULL,
    heure_rdv  TIME NOT NULL,
    description_probleme TEXT NULL,
    statut VARCHAR(10) NOT NULL
        CHECK (statut IN ('Programmé','Annulé','Terminé'))
        DEFAULT 'Programmé',

    CONSTRAINT fk_rdv_client
        FOREIGN KEY (client_id)
        REFERENCES utilisateurs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_rdv_employe
        FOREIGN KEY (employe_id)
        REFERENCES utilisateurs(id)
        ON DELETE CASCADE,

    UNIQUE (employe_id, date_rdv, heure_rdv)
);

-- ====================================================================
-- TRIGGERS PostgreSQL
-- ====================================================================

-- ===============================
-- Vérifier que horaires.employe_id correspond à un employe
-- ===============================

DROP FUNCTION IF EXISTS check_horaires_role() CASCADE;

CREATE OR REPLACE FUNCTION check_horaires_role()
RETURNS trigger AS $$
DECLARE
    r TEXT;
BEGIN
    SELECT role INTO r FROM utilisateurs WHERE id = NEW.employe_id;

    IF r IS NULL OR r <> 'employe' THEN
        RAISE EXCEPTION 'horaires: employe_id doit référencer un employe';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_horaires_role_ins ON horaires;
CREATE TRIGGER trg_horaires_role_ins
BEFORE INSERT ON horaires
FOR EACH ROW
EXECUTE FUNCTION check_horaires_role();

DROP TRIGGER IF EXISTS trg_horaires_role_upd ON horaires;
CREATE TRIGGER trg_horaires_role_upd
BEFORE UPDATE ON horaires
FOR EACH ROW
EXECUTE FUNCTION check_horaires_role();


-- ===============================
-- Vérifier que rendez_vous.client_id est client
-- et employe_id est employe
-- ===============================

DROP FUNCTION IF EXISTS check_rdv_roles() CASCADE;

CREATE OR REPLACE FUNCTION check_rdv_roles()
RETURNS trigger AS $$
DECLARE
    r_emp TEXT;
    r_cli TEXT;
BEGIN
    SELECT role INTO r_emp FROM utilisateurs WHERE id = NEW.employe_id;
    SELECT role INTO r_cli FROM utilisateurs WHERE id = NEW.client_id;

    IF r_emp IS NULL OR r_emp <> 'employe' THEN
        RAISE EXCEPTION 'rendez_vous: employe_id doit référencer un employe';
    END IF;

    IF r_cli IS NULL OR r_cli <> 'client' THEN
        RAISE EXCEPTION 'rendez_vous: client_id doit référencer un client';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_rdv_roles_ins ON rendez_vous;
CREATE TRIGGER trg_rdv_roles_ins
BEFORE INSERT ON rendez_vous
FOR EACH ROW
EXECUTE FUNCTION check_rdv_roles();

DROP TRIGGER IF EXISTS trg_rdv_roles_upd ON rendez_vous;
CREATE TRIGGER trg_rdv_roles_upd
BEFORE UPDATE ON rendez_vous
FOR EACH ROW
EXECUTE FUNCTION check_rdv_roles();

-- ====================================================================
-- PERMISSIONS (à adapter au user utilisé par l'API)
-- ====================================================================

DO $$
DECLARE
  app_user TEXT := 'fixio_local';
BEGIN
  -- Accès au schéma
  EXECUTE format('GRANT USAGE ON SCHEMA public TO %I', app_user);

  -- Droits sur les tables
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.utilisateurs TO %I', app_user);
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.horaires TO %I', app_user);
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.rendez_vous TO %I', app_user);

  -- Droits sur les séquences (SERIAL)
  -- (les noms suivants sont ceux générés par SERIAL, à 99% ce seront ceux-là)
  EXECUTE format('GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.utilisateurs_id_seq TO %I', app_user);
  EXECUTE format('GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.horaires_id_seq TO %I', app_user);
  EXECUTE format('GRANT USAGE, SELECT, UPDATE ON SEQUENCE public.rendez_vous_id_seq TO %I', app_user);

  -- Optionnel : exécution des fonctions (souvent pas nécessaire, mais safe)
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.check_horaires_role() TO %I', app_user);
  EXECUTE format('GRANT EXECUTE ON FUNCTION public.check_rdv_roles() TO %I', app_user);
END $$;