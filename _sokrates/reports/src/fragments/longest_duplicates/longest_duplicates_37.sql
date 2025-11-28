backend\bd\fixiotech.sql [82:89]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FOR EACH ROW
BEGIN
  DECLARE r VARCHAR(10);
  SELECT role INTO r FROM utilisateurs WHERE id = NEW.employe_id;
  IF r IS NULL OR r <> 'employe' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='horaires: employe_id doit référencer employe';
  END IF;
END//
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend\bd\fixiotech.sql [93:100]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
FOR EACH ROW
BEGIN
  DECLARE r VARCHAR(10);
  SELECT role INTO r FROM utilisateurs WHERE id = NEW.employe_id;
  IF r IS NULL OR r <> 'employe' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='horaires: employe_id doit référencer employe';
  END IF;
END//
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



