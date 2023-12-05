const db = require("./DB");
class Assignment{
    constructor(escription, studentText){
        this.description = description;
        this. studentText = studentText;
    }
    static async getStudentText(id){
        return new Promise((resolve, reject)=>{
            db.query(`SELECT description, studentText FROM Assignment WHERE AssignmentID = ${id}`,  (err,res)=>{
                if(err){
                    console.log(err);
                    return reject(err);
                }
                resolve(res);
            })
        })
    }
    static async createAssignment(assignment){
        return new Promise(async (resolve,reject) => {
            const { Description, studentText } = assignment;
        
            // Prepare the INSERT statement with placeholder values to prevent SQL injection.
            const sql = 'INSERT INTO Assignment (description, studentText) VALUES (?, ?)';
            
            // Execute the INSERT query with the values from the 'assignment' object.
            db.query(sql, [Description, studentText], (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err); // Reject the promise if there's an error.
                }
                resolve(result); // Resolve the promise with the result if the insertion is successful.
            });
        })
    }
}
module.exports = Assignment;