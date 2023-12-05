DROP DATABASE IF EXISTS POC;
CREATE DATABASE POC;
USE POC;

DROP TABLE IF EXISTS Assignment;
CREATE TABLE Assignment (
    AssignmentID INT AUTO_INCREMENT  PRIMARY KEY,
    description TEXT,
    studentText TEXT
);

DROP TABLE IF EXISTS Mission;
CREATE TABLE Mission (
    MissionID INT AUTO_INCREMENT  PRIMARY KEY,
    AssignmentID INT,
    shortDescription TEXT,
    fullDescription TEXT,
    finished BOOLEAN,
    dateCreated DATE,
    due DATE,
    FOREIGN KEY (AssignmentID) REFERENCES Assignment(AssignmentID)
);

DROP USER IF EXISTS 'poc-assessment-admin'@'localhost';
CREATE USER 'poc-assessment-admin'@'localhost' IDENTIFIED WITH mysql_native_password BY'12345678';
GRANT ALL PRIVILEGES ON POC.* TO 'poc-assessment-admin'@'localhost';