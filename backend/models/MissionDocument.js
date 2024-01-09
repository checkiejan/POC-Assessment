const db = require("./DB");

class MissionDocument {
    constructor(documentID, iterationID, title, dateAdded) {
        this.documentID = documentID;
        this.iterationID = iterationID;
        this.title = title;
        this.dateAdded = dateAdded || new Date().toISOString().replace('T', ' ').substring(0, 19); // Set dateAdded to current date and time if not provided
    }
    static async checkTitleExists(iterationID, title) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT COUNT(*) as count FROM MissionDocument WHERE IterationID = ? AND Title = ?';

            db.query(query, [iterationID, title], (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                // If count is greater than 0, a document with the same title and iterationID exists
                resolve(res[0].count > 0);
            });
        });
    }
    static async createMissionDocument(missionDocument) {
        console.log(missionDocument);
        return new Promise((resolve, reject) => {
            const { documentID, iterationID, title, dateAdded } = missionDocument;

            const sql = 'INSERT INTO MissionDocument (DocumentID, IterationID, Title, DateAdded) VALUES (?, ?, ?, ?)';
            
            db.query(sql, [documentID, iterationID, title, dateAdded], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async getDocumentsForMission(iterationID) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM MissionDocument WHERE iterationID = ?';

            db.query(query, [iterationID], (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(res);
            });
        });
    }
}

module.exports = MissionDocument;
