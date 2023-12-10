const db = require("./DB");
class Mission{
    constructor( assignmentID, shortDescription, fullDescription, finished, dateCreated, due) {
        this.assignmentID = assignmentID;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.finished = finished;
        this.dateCreated = dateCreated;
        this.due = due;
      }
      static async createMission(mission) {
        return new Promise((resolve, reject) => {
            const { Skill, shortDescription, assignmentID } = mission;
            console.log(mission);
            // Set dateCreated to today's date in the format that your database requires (e.g., YYYY-MM-DD for SQL databases)
            const dateCreated = new Date().toISOString().slice(0, 10);
    
            // Prepare the INSERT statement with placeholder values to prevent SQL injection.
            // Assuming the table is named 'Mission' and has the columns specified in your class diagram.
            const sql = 'INSERT INTO Mission (Skill, shortDescription, dateCreated, AssignmentID) VALUES (?, ?, ?, ?)';
            
            // Execute the INSERT query with the values.
            db.query(sql, [Skill, shortDescription, dateCreated, assignmentID], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err); // Reject the promise if there's an error.
                }
                resolve(result); // Resolve the promise with the result if the insertion is successful.
            });
        });
    }
    static async getAllMission(assignmentID) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Mission WHERE AssignmentID = ?';
    
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
module.exports = Mission;