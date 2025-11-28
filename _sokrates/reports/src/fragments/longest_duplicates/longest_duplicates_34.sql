backend\bd\fixiotech.sql [104:112]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FOR EACH ROW
BEGIN
  DECLARE r_emp VARCHAR(10);
  DECLARE r_cli VARCHAR(10);
  SELECT role INTO r_emp FROM utilisateurs WHERE id = NEW.employe_id;
  SELECT role INTO r_cli FROM utilisateurs WHERE id = NEW.client_id;
  IF r_emp <> 'employe' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='rendez_vous: employe_id=employe'; END IF;
  IF r_cli <> 'client' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='rendez_vous: client_id=client'; END IF;
END//
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\bd\fixiotech.sql [116:124]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FOR EACH ROW
BEGIN
  DECLARE r_emp VARCHAR(10);
  DECLARE r_cli VARCHAR(10);
  SELECT role INTO r_emp FROM utilisateurs WHERE id = NEW.employe_id;
  SELECT role INTO r_cli FROM utilisateurs WHERE id = NEW.client_id;
  IF r_emp <> 'employe' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='rendez_vous: employe_id=employe'; END IF;
  IF r_cli <> 'client' THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='rendez_vous: client_id=client'; END IF;
END//
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



