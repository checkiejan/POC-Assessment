const Assignment = require("../models/Assignment");
const Mission = require("../models/Mission");
const Iteration = require("../models/Iteration");
require('dotenv').config();
exports.getPosts = async (req,res, next) =>{
    res.status(200).json({
        posts: [{title: "First Post", content: "this is the first post!"}]
    });
};

exports.getAssignmentDescription = async (req,res)=>{
    try{
        if (!req.body.AssignmentID || typeof req.body.AssignmentID !== 'number') {
            return res.status(400).json({ message: "The 'AssignmentID' parameter is required and must be a number." });
        }
        let assign = await Assignment.getAssignment(req.body.AssignmentID);
        let studentText = await Assignment.getStudentText(req.body.AssignmentID);
        const essay = studentText[0].StudentText;
        res.status(200).json({
            assignment: assign[0].description,
            essay: essay
        });
    } catch(error){
        res.status(500).json({ message: "Error in fetching data from database", error: error.message });
    }
}


  exports.getIterationsWithMissions = async (req, res) => {
    try {
        if (!req.body.AssignmentID || typeof req.body.AssignmentID !== 'number') {
            return res.status(400).json({ message: "The 'AssignmentID' parameter is required and must be a number." });
        }
        const assignmentID =  req.body.AssignmentID; // adjust based on how you're receiving the ID
        const iterations = await Iteration.getIterationsForAssignment(assignmentID);


        const iterationsWithMissions = await Promise.all(iterations.map(async (iteration) => {
            const missions = await Mission.getAllMission(iteration.IterationID);
            return {
                ...iteration,
                missions: missions
            };
        }));
        console.log(iterationsWithMissions);
        res.status(200).json({
            assignmentID: assignmentID,
            iterations: iterationsWithMissions
        });
    } catch (error) {
        console.error("Error in getIterationsWithMissions:", error);
        res.status(500).json({ message: "Error in fetching iterations and missions", error: error.message });
    }
};
