const express = require("express")
const knowledgeController = require("../controllers/knowledgeController");
const multerMiddleware = require("../middlewares/MulterMiddleware");

const router = express.Router()


router.post("/add",multerMiddleware, knowledgeController.addKnowledge);


module.exports = router;