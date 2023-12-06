const OpenAI = require("openai");
const Assignment = require("../models/Assignment");
require('dotenv').config();
exports.getPosts = async (req,res, next) =>{
    res.status(200).json({
        posts: [{title: "First Post", content: "this is the first post!"}]
    });
};

exports.createSuggestion = async (req,res) =>{
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    }); 
    prompt =
        "Instruction:  take brief improvement from teacher and essay from student" +
        "Instruction: based on a brief improvement description by teacher, extract relavant parts from the essay of the student, then if make the student re-write that specific parts of the essay."+
        "Present that part to student then tell them how to adjust based on the description to practise and give detailed instruction on how they should do it in theory but not step by step."+ 
        "Instruction: response in JSON format like this: \n improvement_description:\n part_need_to_be_improved:\n"+
        "Instruction: improvement_description need to be specific and sound friendly to students by giving them detailed instruction";

    const handleSuggest = async ()=>{
        let assign = await Assignment.getStudentText(1);
        const chatCompletion = await openai.chat.completions.create({
            // messages: [
            //     {"role": "system", "content": "Response with JSON, Task description: based on a brief improvement description by teacher, write 1-2 example tasks for students to practise and give instruction on how they should do it. with this example:\n mission: please ensure to write more compelling opening. \n tasks: in your criteria response, I set you the mission of writing more compelling opening. please try to re-write your opening below, making your response as engaging as possible: 'today is a good day and I'm excited for school.'\n"},
            //     {"role": "user", "content": "in the future please follow the rules of writing dialouge"}
            // ],
            messages: [
                //{"role": "system", "content": "Response with JSON, Task description: based on a brief improvement description by teacher, write 1-2 example tasks for students to practise and give instruction on how they should do it in theory but not step by step. response in JSON format like this: \n task description:\n task:\ntask instruction:\n"},
                {"role": "system", "content": `${prompt}`},
                {"role": "user", "content": `brief improvement: ${req.body.short_description}, essay:${assign[0].StudentText}`}
            ],
            // model: "gpt-3.5-turbo-1106",
            model: process.env.MODEL_FINTUNED,
            response_format: { "type": "json_object" },
        });
        return chatCompletion;
    }
    try {
        const responseFromOpenAI = await handleSuggest();
        // console.log(responseFromOpenAI.choices[0].message);
        res.status(200).json({
            message: "Successfully created suggestion!",
            openAIResponse: responseFromOpenAI.choices[0].message, // Assuming the response data is what you want to send
            data: [{title: "a", content: "this is the lalalla t post!"}]
        });
    } catch (error) {
        res.status(500).json({ message: "Error in fetching data from OpenAI", error: error.message });
    }
}

exports.getAssignmentDescription = async (req,res)=>{
    try{
        let assign = await Assignment.getAssignment(1);
        res.status(200).json({
            assignment: assign[0].description
        });
    } catch(error){
        res.status(500).json({ message: "Error in fetching data from database", error: error.message });
    }
}
