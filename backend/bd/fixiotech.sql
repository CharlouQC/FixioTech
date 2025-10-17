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
  role ENUM('client','employe','admin') NOT NULL DEFAULT 'client'
);

-- Table des horaires
CREATE TABLE horaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employe_compte_id INT NOT NULL,
  jour_semaine ENUM('Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche') NOT NULL,
  heure_debut TIME NOT NULL,
  heure_fin TIME NOT NULL,
  FOREIGN KEY (employe_compte_id) REFERENCES comptes(id) ON DELETE CASCADE
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

