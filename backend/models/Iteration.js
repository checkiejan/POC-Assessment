const db = require("./DB");

class Iteration{
    constructor(assignmentID, shortDescription, dateCreated) {
        this.assignmentID = assignmentID;
        this.shortDescription = shortDescription;
        this.dateCreated = dateCreated || new Date().toISOString().replace('T', ' ').substring(0, 19); // Set dateCreated to today's date if not provided
    }
    static async createIteration(iteration) {
        return new Promise((resolve, reject) => {
            const { assignmentID, shortDescription } = iteration;
            const dateCreated = new Date().toISOString().slice(0, 10);

            const sql = 'INSERT INTO Iteration (AssignmentID, shortDescription, dateCreated) VALUES (?, ?, ?)';
            
            db.query(sql, [assignmentID, shortDescription, dateCreated], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
    static async getIterationsForAssignment(assignmentID) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Iteration WHERE AssignmentID = ? order by dateCreated';
    
            db.query(query, [assignmentID], (err, res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(res);
            });
        });
    }
}

module.exports = Iteration;