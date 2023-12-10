const Assignment = require("../models/Assignment");
require('dotenv').config();
exports.getPosts = async (req,res, next) =>{
    res.status(200).json({
        posts: [{title: "First Post", content: "this is the first post!"}]
    });
};

exports.getAssignmentDescription = async (req,res)=>{
    console.log(req.body.AssignmentID);
    try{
        let assign = await Assignment.getAssignment(req.body.AssignmentID);
        res.status(200).json({
            assignment: assign[0].description
        });
    } catch(error){
        res.status(500).json({ message: "Error in fetching data from database", error: error.message });
    }
}

