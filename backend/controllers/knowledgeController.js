const  PromptTemplate = require( "langchain/prompts");
const PineconeStoreModule =  require( "langchain/vectorstores/pinecone");
const OpenAIEmbeddingsModule = require( "langchain/embeddings/openai");
const PineconeModule = require("@pinecone-database/pinecone");
const ChatOpenAI = require("langchain/chat_models/openai");
const RecursiveCharacterTextSplitter = require("langchain/text_splitter");
const Document = require("langchain/document");
const pdf = require('pdf-parse');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const MissionDocument = require("../models/MissionDocument");
const CleanString = require("../utils/CleanString");

require('dotenv').config();
const pinecone = new PineconeModule.Pinecone();
const OpenAIEmbeddings = new OpenAIEmbeddingsModule.OpenAIEmbeddings();

exports.addKnowledge = async (req,res)=>{
    if (!req.file) {
        return res.status(400).json({message:'No file uploaded.'});
    }
    req.body.iterationID = parseInt(req.body.iterationID);
    if (!req.body.iterationID || typeof req.body.iterationID !== 'number') {
        return res.status(400).json({ message: "The 'iterationID' parameter is required and must be a number." });
    }
    if (!req.body.title ) {
        return res.status(400).json({ message: "The 'title' parameter is required." });
    }

    // Check if the uploaded file is a PDF
    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({message:'The file must be a PDF.'});
    }
    const titleExists = await MissionDocument.checkTitleExists(req.body.iterationID, req.body.title);
    if (titleExists) {
        return res.status(400).json({
            message: 'A document with this title and iterationID already exists.'
        });
    }
    const createMetadata = (id,iterationID, title) => {
 
        return { 
            "doc_id": id, 
            "iterationID" :iterationID, 
            "title": title
        };
    };

    try {
        let dataBuffer = req.file.buffer; // Assuming the file is available in req.file.buffer
        const data = await pdf(dataBuffer);
        data.text = CleanString(data.text);
        let chunkSize = 500;
        let chunkOverlap = 150;
        let text_splitter = new RecursiveCharacterTextSplitter.RecursiveCharacterTextSplitter({chunkSize: chunkSize, chunkOverlap:chunkOverlap});
        let docs = await text_splitter.splitDocuments([new Document.Document({pageContent: data.text})]);
        const doc_id = uuidv4();

        docs.forEach(doc => {
            const newMetadata = createMetadata(doc_id, req.body.iterationID, req.body.title);
            doc.metadata = {
                ...doc.metadata, // Spread existing metadata
                ...newMetadata    // Spread new metadata
            };
        });
        
        console.log(docs.length)
        // console.log(docs);
       
        const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX);  //get the index 
        await PineconeStoreModule.PineconeStore.fromDocuments(docs, OpenAIEmbeddings,{pineconeIndex}); //store embeddings into pinecone
        
        // 'data.text' is a string containing the extracted text content of the PDF
        // console.log('PDF Content:', data.text);
       
        MissionDocument.createMissionDocument(new MissionDocument(doc_id, req.body.iterationID, req.body.title));
        res.send({
            status: 'success',
            message: 'write successfully to Pinecone',
            content: docs,
        });
    } catch (error) {
        console.error('Error reading PDF:', error);
        res.status(500).json({message: 'Error reading PDF file.'});
    }
}