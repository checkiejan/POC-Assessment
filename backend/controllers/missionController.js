const Mission = require("../models/Mission");
exports.getPosts = async (req,res, next) =>{
    console.log(req.body);
    res.status(200).json({
        posts: [{title: "First Post", content: "this is the first post!"}]
    });
};
exports.addMission = async (req, res) => {
    try {
        // Validate that only 'skill' and 'shortDescription' are present in the request body
        const requiredAttributes = ['skill', 'shortDescription', 'assignmentID'];
        const requestAttributes = Object.keys(req.body);

        // Check if all required attributes are present and that there are no additional attributes
        const isValidRequest = requiredAttributes.every(attr => requestAttributes.includes(attr)) &&
                               requestAttributes.length === requiredAttributes.length;

        if (!isValidRequest) {
            return res.status(400).json({ message: "Request must include exactly 'skill, 'shortDescription' and 'assignmentID'." });
        }

        // Assuming req.body has all the necessary fields to create a new mission.
        const newMissionData = {
            Skill: req.body.skill,
            shortDescription: req.body.shortDescription,
            assignmentID:  req.body.assignmentID,
        };

        // Now, use the Mission model's static method to create a new mission entry in the database.
        const result = await Mission.createMission(newMissionData);
        // console.log(result);
        
        res.status(201).json({
            message: "Mission added successfully",
            missionId: result.insertId, // assuming your DB returns the id of the newly created record
            mission: newMissionData
        });
    } catch (error) {
        res.status(500).json({ message: "Error in adding new mission", error: error.message });
    }
}


// You would also implement other functions for different operations like getting all missions
exports.getAllMissionsByAssignmentID = async (req, res) => {
    try {

        // Check if the assignmentID is provided in the body and is of the correct type
        if (!req.body.assignmentID || typeof req.body.assignmentID !== 'number') {
            return res.status(400).json({ message: "The 'assignmentID' parameter is required and must be a number." });
        }

        const assignmentID = req.body.assignmentID;
        const missions = await Mission.getAllMission(assignmentID);

        res.status(200).json({
            message: "Missions fetched successfully",
            missions: missions
        });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching missions", error: error.message });
    }
}

exports.deleteMission = async (req, res) => {
    try {
        // Check if both MissionID and AssignmentID are provided in the request body
        if (!req.body.missionID || !req.body.assignmentID) {
            return res.status(400).json({ message: "Both 'missionID' and 'assignmentID' parameters are required." });
        }

        const missionID = req.body.missionID;
        const assignmentID = req.body.assignmentID;

        // Use the Mission model's static method to delete the mission from the database.
        const result = await Mission.deleteMission(missionID, assignmentID);

        // Check if any rows were affected (i.e., if the mission was actually deleted)
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Mission not found." });
        }

        res.status(200).json({
            message: "Mission deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Error in deleting mission", error: error.message });
    }
};

