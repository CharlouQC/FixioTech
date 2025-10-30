-- ====================================================================
-- Schéma de base de données : fixiotech
-- MySQL 8+ (InnoDB, utf8mb4)
-- ====================================================================

DROP DATABASE IF EXISTS fixiotech;

-- Création de la base
CREATE DATABASE fixiotech
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE fixiotech;

-- =========================
-- Table des utilisateurs
-- =========================
CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  nom_complet VARCHAR(100) NOT NULL,
  role ENUM('client','employe','admin') NOT NULL DEFAULT 'client'
);

-- =========================
-- Table des horaires (1 ligne = semaine complète)
-- =========================
CREATE TABLE horaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employe_id INT NOT NULL,
  -- Heures de travail pour chaque jour de la semaine (NULL = ne travaille pas)
  lundi_debut TIME NULL,
  lundi_fin   TIME NULL,
  mardi_debut TIME NULL,
  mardi_fin   TIME NULL,
  mercredi_debut TIME NULL,
  mercredi_fin   TIME NULL,
  jeudi_debut TIME NULL,
  jeudi_fin   TIME NULL,
  vendredi_debut TIME NULL,
  vendredi_fin   TIME NULL,
  samedi_debut TIME NULL,
  samedi_fin   TIME NULL,
  dimanche_debut TIME NULL,
  dimanche_fin   TIME NULL,

  CONSTRAINT fk_horaires_employe
    FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,

  CONSTRAINT uq_horaires_employe UNIQUE (employe_id),

  -- Checks par jour: soit les 2 NULL, soit tous deux non NULL et debut < fin
  CONSTRAINT chk_lundi CHECK (
    (lundi_debut IS NULL AND lundi_fin IS NULL)
    OR (lundi_debut IS NOT NULL AND lundi_fin IS NOT NULL AND lundi_debut < lundi_fin)
  ),
  CONSTRAINT chk_mardi CHECK (
    (mardi_debut IS NULL AND mardi_fin IS NULL)
    OR (mardi_debut IS NOT NULL AND mardi_fin IS NOT NULL AND mardi_debut < mardi_fin)
  ),
  CONSTRAINT chk_mercredi CHECK (
    (mercredi_debut IS NULL AND mercredi_fin IS NULL)
    OR (mercredi_debut IS NOT NULL AND mercredi_fin IS NOT NULL AND mercredi_debut < mercredi_fin)
  ),
  CONSTRAINT chk_jeudi CHECK (
    (jeudi_debut IS NULL AND jeudi_fin IS NULL)
    OR (jeudi_debut IS NOT NULL AND jeudi_fin IS NOT NULL AND jeudi_debut < jeudi_fin)
  ),
  CONSTRAINT chk_vendredi CHECK (
    (vendredi_debut IS NULL AND vendredi_fin IS NULL)
    OR (vendredi_debut IS NOT NULL AND vendredi_fin IS NOT NULL AND vendredi_debut < vendredi_fin)
  ),
  CONSTRAINT chk_samedi CHECK (
    (samedi_debut IS NULL AND samedi_fin IS NULL)
    OR (samedi_debut IS NOT NULL AND samedi_fin IS NOT NULL AND samedi_debut < samedi_fin)
  ),
  CONSTRAINT chk_dimanche CHECK (
    (dimanche_debut IS NULL AND dimanche_fin IS NULL)
    OR (dimanche_debut IS NOT NULL AND dimanche_fin IS NOT NULL AND dimanche_debut < dimanche_fin)
  )
) ENGINE=InnoDB;



-- =========================
-- Table des rendez-vous
-- =========================
CREATE TABLE rendez_vous (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id  INT NOT NULL,
  employe_id INT NOT NULL,
  date_rdv   DATE NOT NULL,
  heure_rdv  TIME NOT NULL,
  description_probleme TEXT NULL,
  statut ENUM('Programmé','Annulé','Terminé') DEFAULT 'Programmé',

  CONSTRAINT fk_rdv_client
    FOREIGN KEY (client_id)  REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_rdv_employe
    FOREIGN KEY (employe_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,

  -- Un employé ne peut avoir qu'un rendez-vous à une heure donnée
  UNIQUE (employe_id, date_rdv, heure_rdv)
) ENGINE=InnoDB;

-- =========================
-- Triggers de rôle (cohérence métier)
-- =========================
DELIMITER //

-- Horaires: employe_id doit référencer un utilisateur role='employe'
CREATE TRIGGER trg_horaires_role_ins
BEFORE INSERT ON horaires
FOR EACH ROW
BEGIN
  DECLARE r VARCHAR(10);
  SELECT role INTO r FROM utilisateurs WHERE id = NEW.employe_id;
  IF r IS NULL OR r <> 'employe' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'horaires: employe_id doit référencer un utilisateur avec role=employe';
  END IF;
END//

CREATE TRIGGER trg_horaires_role_upd
BEFORE UPDATE ON horaires
FOR EACH ROW
BEGIN
  DECLARE r VARCHAR(10);
  SELECT role INTO r FROM utilisateurs WHERE id = NEW.employe_id;
  IF r IS NULL OR r <> 'employe' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'horaires: employe_id doit référencer un utilisateur avec role=employe';
  END IF;
END//

-- Rendez-vous: employe_id -> role='employe', client_id -> role='client'
CREATE TRIGGER trg_rdv_roles_ins
BEFORE INSERT ON rendez_vous
FOR EACH ROW
BEGIN
  DECLARE r_emp VARCHAR(10);
  DECLARE r_cli VARCHAR(10);
  SELECT role INTO r_emp FROM utilisateurs WHERE id = NEW.employe_id;
  SELECT role INTO r_cli FROM utilisateurs WHERE id = NEW.client_id;
  IF r_emp IS NULL OR r_emp <> 'employe' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'rendez_vous: employe_id doit avoir role=employe';
  END IF;
  IF r_cli IS NULL OR r_cli <> 'client' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'rendez_vous: client_id doit avoir role=client';
  END IF;
END//

CREATE TRIGGER trg_rdv_roles_upd
BEFORE UPDATE ON rendez_vous
FOR EACH ROW
BEGIN
  DECLARE r_emp VARCHAR(10);
  DECLARE r_cli VARCHAR(10);
  SELECT role INTO r_emp FROM utilisateurs WHERE id = NEW.employe_id;
  SELECT role INTO r_cli FROM utilisateurs WHERE id = NEW.client_id;
  IF r_emp IS NULL OR r_emp <> 'employe' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'rendez_vous: employe_id doit avoir role=employe';
  END IF;
  IF r_cli IS NULL OR r_cli <> 'client' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'rendez_vous: client_id doit avoir role=client';
  END IF;
END//

DELIMITER ;