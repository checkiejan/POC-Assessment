const OpenAI = require("openai");
const Assignment = require("../models/Assignment");

import { PromptTemplate } from "langchain/prompts";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { ChatOpenAI } from "langchain/chat_models/openai";
require('dotenv').config();

// pinecone.init({
//     api_key: "dc27960f-8055-4d72-9aa5-d75b658b1718", 
//     environment: "gcp-starter" 
// })

exports.getPosts = async (req,res, next) =>{
    console.log(req)
    res.status(200).json({
        req: req.body,
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

exports.createSuggestionV2 = async (req,res)=>{
    try {
        const pinecone = new Pinecone();
        const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);
        let prompt_template = `
        Instruction:  take brief improvement from teacher, essay from student and relevant information from materials provided by teacher
        Instruction: based on a brief improvement description by teacher, extract relavant parts from the essay of the student, then if needed, make the student re-write that specific parts of the essay.
        Present that part to student then tell them how to adjust based on the description to practise and give detailed instruction on how they should do it in theory but not step by step. 
        Instruction: response in JSON format like this:   improvement_description:\n specific_instruction_to_student:\n student_revise_essay:\n
        Instruction: improvement_description need to be specific, detailed and sound friendly to students by giving them detailed instructions with information based on the teaching material to mention the lessons for student.
        and it should contain the particulart student essay part repeat the part the student need to re-write. the specific instruction should be detailed and based on teaching material to help student revise lesso
        at the end of specific instruction, you can add one sentence to tell student to do what you want polietly and friendly
        brief improvement:{improvement} 
        student essay: {essay}
        material:{context}
        Instruction: response in JSON format like this: improvement_description:\n specific_instruction_to_student:\n student_revise_essay:\n
        Instruction: improvement_description need to be specific, detailed and sound friendly to students by giving them detailed instructions with information based on the teaching material to mention the lessons for student.
        and it should contain the particulart student essay part repeat the part the student need to re-write. the specific instruction should be detailed and based on teaching material to help student revise lesso
        at the end of specific instruction, you can add one sentence to tell student to do what you want polietly and friendly
        `
        PROMPT = new PromptTemplate({
            template: prompt_template, 
            input_variables:["context", "improvement","essay"]
        });
        const improvement = req.body.short_description;
        let assignment = await Assignment.getStudentText(1);
        const essay = assignment[0].StudentText;
        top_k=17
        const search = await vectorStore.similaritySearch(improvement, top_k);
        const search_extracted = search.map(x=>x.pageContent);
        const llm = new ChatOpenAI({
            temperature: 0.9,
            modelName: 'gpt-3.5-turbo-1106',
            openAIApiKey:  process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
          });
        const result = await llm.predict(text = PROMPT.format({
            context: search_extracted,
            improvement: improvement,
            essay: essay
        }))
        res.status(200).json({
            message: "Successfully created suggestion!",
            openAIResponse: result, // Assuming the response data is what you want to send
            data: [{title: "a", content: "this is the lalalla t post!"}]
        });
    }
    catch (error) 
    {
        res.status(500).json({ message: "Error in fetching data from OpenAI", error: error.message });
    }
}