const OpenAI = require("openai");
const Assignment = require("../models/Assignment");

const  PromptTemplate = require( "langchain/prompts");
const PineconeStoreModule =  require( "langchain/vectorstores/pinecone");
const OpenAIEmbeddingsModule = require( "langchain/embeddings/openai");
const PineconeModule = require("@pinecone-database/pinecone");
const ChatOpenAI = require("langchain/chat_models/openai");
const LLMChain = require("langchain/chains")
const MultiQueryRetriever = require("langchain/retrievers/multi_query")
const LineListOutputParser = require("../utils/LineListOutputParser");
require('dotenv').config();

const pinecone = new PineconeModule.Pinecone();
const OpenAIEmbeddings = new OpenAIEmbeddingsModule.OpenAIEmbeddings();
const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX);        
const vectorStore = new PineconeStoreModule.PineconeStore( OpenAIEmbeddings,
    { pineconeIndex})
// PineconeStore.pineconeIndex = process.env.PINECONE_INDEX;
// const pinecone = new Pinecone();
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
        let prompt_template = `
        Objective:
        Provide concise, actionable feedback to a student by using the teacher's brief improvement notes, the student's essay, and the teaching materials. Guide the student through revising their essay with an emphasis on conceptual understanding and application of the feedback.
        
        Inputs:
        Brief Improvement: {improvement}
        Student Essay: {essay}
        Teaching Material: {context}
        Feedback Task:
        Isolate the essay sections needing revision as indicated by the teacher's notes.
        Formulate a clear, detailed and student-friendly improvement guide, merging the teacher's notes with relevant teaching material aspects.
        Instruct the student on conceptual adjustments to the essay, avoiding procedural instructions.
        End with an encouraging remark to inspire the student to implement the feedback.
        Response Format:
        Provide your response in JSON format as follows:
        
        
          "improvement_notes": "<concise_notes_based_on_teacher_feedback>",
          "revision_guidance": "<conceptual_guidance_for_essay_revision>",
          "essay_excerpt": "<excerpt_from_essay_requiring_revision>",
          "motivational_message": "<positive_remark_to_encourage_revision_practice>"
        
        The improvement_notes should summarize the teacher's feedback and point out the specific essay areas for enhancement.
        The revision_guidance should mentor the student on the underlying principles for revising their essay, referencing the teaching material.
        The motivational_message should uplift the student and prompt them to engage with the revision process.
        
        `
        
        const PROMPT = new PromptTemplate.PromptTemplate({
            template: prompt_template, 
            inputVariables:["context", "improvement","essay"]
        });
        const improvement = req.body.short_description;
        let assignment = await Assignment.getStudentText(1);
        const essay = assignment[0].StudentText;
        const top_k=5;
       
        const search = await  vectorStore.similaritySearch(improvement,top_k);
        const search_extracted = search.map(x=>x.pageContent);
        const llm = new ChatOpenAI.ChatOpenAI({
            temperature: 0.5,
            modelName: 'gpt-4-1106-preview',
            openAIApiKey:  process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
          });
        const query = await PROMPT.format({
            context: search_extracted,
            improvement: improvement,
            essay: essay
        })
        console.log(query.length)
        
        const result = await llm.predict(text = query)
        res.status(200).json({
            message: "Successfully created suggestion!",
            openAIResponse: result, // Assuming the response data is what you want to send
            initialPrompt: query,
        });
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "Error in fetching data from OpenAI", error: error.message });
    }
}

exports.createAdjustment = async (req,res)=>{
    const { request, initialPrompt, bot_response } = req.body;
    // console.log(req.body);
    // Validate that all required attributes are present
    if (!request || !initialPrompt || !bot_response) {
        console.log("missing");
        return res.status(400).json({
            success: false,
            message: "Missing required attributes in the request body."
        });
    }
    try{
        let prompt_improvement_template =   `
        Instruction: You will be given history of the chat to make adjustment to your previous response based on the request to improve description by making a new one, 
        dont keep the orginal format return the response as paragraphs but 
        still need to follow specific requriement in the instruction. in addition to smooth transition between parts, you still need to refer to the teaching material
        request: {request}
        history: {user_request}
        bot: {bot_response}
        
        Instruction: You will be given history of the chat to make adjustment to your previous response based on the request to improve description by making a new one, 
        dont keep the orginal format return the response as paragraphs but 
        still need to follow specific requriement in the instruction. in addition to smooth transition between parts, you still need to refer to the teaching material
        `
        const prompt_to_improve = new PromptTemplate.PromptTemplate({
            template: prompt_improvement_template, 
            inputVariables:["user_request","bot_response", "request"]
        });
        const query = await prompt_to_improve.format({
            user_request: initialPrompt,
            bot_response: bot_response,
            request: request,
        })
        const llm = new ChatOpenAI.ChatOpenAI({
            temperature: 0.5,
            modelName: 'gpt-4-1106-preview',
            openAIApiKey:  process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        });
        const result = await llm.predict(text = query)
        res.status(200).json({
            message: "Successfully created suggestion!",
            openAIResponse: result, // Assuming the response data is what you want to send
            initialPrompt: query,
        });
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).json({ message: "Error in fetching data from OpenAI", error: error.message });
    }
}

const multiQuery = async (query,k=4)=>{
   
    try{
        const llm_query =  new ChatOpenAI.ChatOpenAI({
            temperature: 0.0,
            modelName: 'gpt-3.5-turbo-1106',
            openAIApiKey:  process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        });
        const template = `
        You are an AI language model assistant. Your task is to generate five
        different versions of the given user question to retrieve relevant documents from a vector
        database. The user questions are focused on teaching material to help improve english skills for students
        By generating multiple perspectives on the user question, your goal is to help
        the user overcome some of the limitations of the distance-based similarity search and
        we want to get a variety of RELEVANT search results.
        Provide these alternative questions separated by newlines.
        Original question: {question}
        `;
        const query_prompt = new PromptTemplate.PromptTemplate({
            template: template, 
            inputVariables:["question"]
        });
        console.log("Adad")
        const llm_chain = new LLMChain.LLMChain({
            llm: llm_query,
            prompt: query_prompt,
            outputParser: new LineListOutputParser(),
        });
        const retriever = new MultiQueryRetriever.MultiQueryRetriever({
            llmChain: llm_chain,
            retriever: vectorStore.asRetriever(),
            // retriever: vectorStore.asRetriever(top_k=k),
            parserKey: "lines",
            // verbose: true,
        });
        const result = await retriever.getRelevantDocuments(query);
        // let result = await query_prompt.format({question:query});
        console.log(result);
        return result
    }
    catch (error){
        console.log(error);
        return error
    }
}

exports.testMultiQuery = async (req,res)=>{
    if(!req.body.query){
        return res.status(400).json({
            success: false,
            message: "Missing attribute `query` in the request body."
        })
    }
    try{
        const result = await multiQuery(req.body.query);
        res.status(200).json({
            message: "Successfully created suggestion!",
            openAIResponse: result.map(x=>x.pageContent), // Assuming the response data is what you want to send
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Error in retrieving data", error: error.message });
    }
}