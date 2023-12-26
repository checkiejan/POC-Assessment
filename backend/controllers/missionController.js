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
        const requiredAttributes = ['skill', 'shortDescription', 'iterationID'];
        const requestAttributes = Object.keys(req.body);

        // Check if all required attributes are present and that there are no additional attributes
        const isValidRequest = requiredAttributes.every(attr => requestAttributes.includes(attr)) &&
                               requestAttributes.length === requiredAttributes.length;

        if (!isValidRequest) {
            return res.status(400).json({ message: "Request must include exactly 'skill, 'shortDescription' and 'iterationID'." });
        }

        // Assuming req.body has all the necessary fields to create a new mission.
        const newMissionData = {
            Skill: req.body.skill,
            shortDescription: req.body.shortDescription,
            iterationID:  req.body.iterationID,
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
exports.getAllMissionsByIterationID = async (req, res) => {
    try {
        // Check if the iterationID is provided in the body and is of the correct type
        if (!req.body.iterationID || typeof req.body.iterationID !== 'number') {
            return res.status(400).json({ message: "The 'iterationID' parameter is required and must be a number." });
        }

        const iterationID = req.body.iterationID;
        const missions = await Mission.getAllMission(iterationID);

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
        // Check if both MissionID and iterationID are provided in the request body
        if (!req.body.missionID || !req.body.iterationID) {
            return res.status(400).json({ message: "Both 'missionID' and 'iterationID' parameters are required." });
        }

        const missionID = req.body.missionID;
        const iterationID = req.body.iterationID;

        // Use the Mission model's static method to delete the mission from the database.
        const result = await Mission.deleteMission(missionID, iterationID);

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

