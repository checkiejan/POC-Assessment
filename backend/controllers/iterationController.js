const Iteration = require("../models/Iteration");

exports.createIteration = async (req,res)=>{
    console.log(req.body)
    if (!req.body.AssignmentID || typeof req.body.AssignmentID !== 'number') {
        return res.status(400).json({ message: "The 'AssignmentID' parameter is required and must be a number." });
    }
    if(!req.body.shortDescription){
        return res.status(400).json({ message: "The 'shortDescription' parameter is required." });
    }
    try{
        const newIteration = new Iteration(req.body.AssignmentID, req.body.shortDescription);
        const result = await Iteration.createIteration(newIteration);
        res.status(201).json({
            message: "Iteration added successfully",
            iterationId: result.insertId, // assuming your DB returns the id of the newly created record
            iteration: newIteration
        });
    }
    catch(error){
        res.status(500).json({ message: "Error in fetching data from database", error: error.message });
    }
}