const  PromptTemplate = require( "langchain/prompts");
const PineconeStoreModule =  require( "langchain/vectorstores/pinecone");
const OpenAIEmbeddingsModule = require( "langchain/embeddings/openai");
const PineconeModule = require("@pinecone-database/pinecone");
const ChatOpenAI = require("langchain/chat_models/openai");
const RecursiveCharacterTextSplitter = require("langchain/text_splitter");
const Document = require("langchain/document");
const pdf = require('pdf-parse');
const fs = require('fs');

require('dotenv').config();
const pinecone = new PineconeModule.Pinecone();
const OpenAIEmbeddings = new OpenAIEmbeddingsModule.OpenAIEmbeddings();

exports.addKnowledge = async (req,res)=>{
    console.log(req.body)
    if (!req.file) {
        return res.status(400).json({message:'No file uploaded.'});
    }

    // Check if the uploaded file is a PDF
    if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({message:'The file must be a PDF.'});
    }

    try {
        let dataBuffer = req.file.buffer; // Assuming the file is available in req.file.buffer
        const data = await pdf(dataBuffer);
        let text_splitter = new RecursiveCharacterTextSplitter.RecursiveCharacterTextSplitter({chunkSize: 300, chunkOverlap:50});
        let docs = await text_splitter.splitDocuments([new Document.Document({pageContent: data.text})]);
        const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX);  //get the index 
        await PineconeStoreModule.PineconeStore.fromDocuments(docs, OpenAIEmbeddings,{pineconeIndex}); //store embeddings into pinecone
        // 'data.text' is a string containing the extracted text content of the PDF
        // console.log('PDF Content:', data.text);

        res.send({
            status: 'success',
            message: 'write successfully to Pinecone',
            content: data.text,
        });
    } catch (error) {
        console.error('Error reading PDF:', error);
        res.status(500).json({message: 'Error reading PDF file.'});
    }
}