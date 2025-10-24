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

-- Table des utilisateurs
CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  nom_complet VARCHAR(100) NOT NULL,
  role ENUM('client','employe','admin') NOT NULL DEFAULT 'client'
);

-- Table des horaires
CREATE TABLE horaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employe_id INT NOT NULL,
    -- Heures de travail pour chaque jour de la semaine
    lundi_debut TIME NULL,
    lundi_fin TIME NULL,
    mardi_debut TIME NULL,
    mardi_fin TIME NULL,
    mercredi_debut TIME NULL,
    mercredi_fin TIME NULL,
    jeudi_debut TIME NULL,
    jeudi_fin TIME NULL,
    vendredi_debut TIME NULL,
    vendredi_fin TIME NULL,
    samedi_debut TIME NULL,
    samedi_fin TIME NULL,
    dimanche_debut TIME NULL,
    dimanche_fin TIME NULL,
    FOREIGN KEY (employe_id) REFERENCES employes(id) ON DELETE CASCADE
);

-- Table des rendez-vous
CREATE TABLE rendez_vous (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_compte_id INT NOT NULL,
  employe_compte_id INT NOT NULL,
  date_rdv DATE NOT NULL,
  heure_rdv TIME NOT NULL,
  statut ENUM('Programmé','Annulé','Terminé') DEFAULT 'Programmé',
  FOREIGN KEY (client_compte_id)  REFERENCES comptes(id) ON DELETE CASCADE,
  FOREIGN KEY (employe_compte_id) REFERENCES comptes(id) ON DELETE CASCADE,
  UNIQUE (employe_compte_id, date_rdv, heure_rdv)
);

-- Contraintes pour les rôles des utilisateurs
DELIMITER //

CREATE TRIGGER chk_horaires_role
BEFORE INSERT ON horaires
FOR EACH ROW
BEGIN
  IF (SELECT role FROM comptes WHERE id = NEW.employe_compte_id) <> 'employe' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'horaires: employe_compte_id doit avoir role=employe';
  END IF;
END//

CREATE TRIGGER chk_rdv_roles
BEFORE INSERT ON rendez_vous
FOR EACH ROW
BEGIN
  IF (SELECT role FROM comptes WHERE id = NEW.employe_compte_id) <> 'employe' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'rendez_vous: employe_compte_id doit avoir role=employe';
  END IF;
  IF (SELECT role FROM comptes WHERE id = NEW.client_compte_id) <> 'client' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'rendez_vous: client_compte_id doit avoir role=client';
  END IF;
END//

DELIMITER ;

-- Ajout des contraintes pour la table horaire
ALTER TABLE horaires
  ADD CONSTRAINT uq_horaires_employe UNIQUE (employe_id),

  ADD CONSTRAINT chk_lundi CHECK (
    (lundi_debut IS NULL AND lundi_fin IS NULL)
    OR (lundi_debut IS NOT NULL AND lundi_fin IS NOT NULL AND lundi_debut < lundi_fin)
  ),
  ADD CONSTRAINT chk_mardi CHECK (
    (mardi_debut IS NULL AND mardi_fin IS NULL)
    OR (mardi_debut IS NOT NULL AND mardi_fin IS NOT NULL AND mardi_debut < mardi_fin)
  ),
  ADD CONSTRAINT chk_mercredi CHECK (
    (mercredi_debut IS NULL AND mercredi_fin IS NULL)
    OR (mercredi_debut IS NOT NULL AND mercredi_fin IS NOT NULL AND mercredi_debut < mercredi_fin)
  ),
  ADD CONSTRAINT chk_jeudi CHECK (
    (jeudi_debut IS NULL AND jeudi_fin IS NULL)
    OR (jeudi_debut IS NOT NULL AND jeudi_fin IS NOT NULL AND jeudi_debut < jeudi_fin)
  ),
  ADD CONSTRAINT chk_vendredi CHECK (
    (vendredi_debut IS NULL AND vendredi_fin IS NULL)
    OR (vendredi_debut IS NOT NULL AND vendredi_fin IS NOT NULL AND vendredi_debut < vendredi_fin)
  ),
  ADD CONSTRAINT chk_samedi CHECK (
    (samedi_debut IS NULL AND samedi_fin IS NULL)
    OR (samedi_debut IS NOT NULL AND samedi_fin IS NOT NULL AND samedi_debut < samedi_fin)
  ),
  ADD CONSTRAINT chk_dimanche CHECK (
    (dimanche_debut IS NULL AND dimanche_fin IS NULL)
    OR (dimanche_debut IS NOT NULL AND dimanche_fin IS NOT NULL AND dimanche_debut < dimanche_fin)
  );

