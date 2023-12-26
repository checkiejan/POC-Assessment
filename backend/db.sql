DROP DATABASE IF EXISTS POC;
CREATE DATABASE POC;
USE POC;

DROP TABLE IF EXISTS Assignment;
CREATE TABLE Assignment (
    AssignmentID INT AUTO_INCREMENT PRIMARY KEY,
    description TEXT
);

DROP TABLE IF EXISTS Iteration;
CREATE TABLE Iteration (
    IterationID INT AUTO_INCREMENT PRIMARY KEY,
    AssignmentID INT,
    shortDescription VARCHAR(255),
    dateCreated DATETIME,
    FOREIGN KEY (AssignmentID) REFERENCES Assignment(AssignmentID)
);

DROP TABLE IF EXISTS Mission;
CREATE TABLE Mission (
    MissionID INT AUTO_INCREMENT PRIMARY KEY,
    IterationID INT,
    Skill VARCHAR(255),
    shortDescription VARCHAR(255),
    fullDescription TEXT,
    finished BOOLEAN,
    dateCreated DATETIME,
    due DATETIME,
    mark DECIMAL(5,2),
    feedback TEXT,
    FOREIGN KEY (IterationID) REFERENCES Iteration(IterationID)
);

DROP TABLE IF EXISTS StudentSubmission;
CREATE TABLE StudentSubmission (
    SubmissionID INT AUTO_INCREMENT PRIMARY KEY,
    AssignmentID INT,
    StudentText TEXT,
    FOREIGN KEY (AssignmentID) REFERENCES Assignment(AssignmentID)
);

DROP USER IF EXISTS 'poc-assessment-admin'@'localhost';
CREATE USER 'poc-assessment-admin'@'localhost' IDENTIFIED WITH mysql_native_password BY'12345678';
GRANT ALL PRIVILEGES ON POC.* TO 'poc-assessment-admin'@'localhost';