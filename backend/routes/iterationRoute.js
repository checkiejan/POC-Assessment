const express = require("express")
const iteartionController = require("../controllers/iterationController");
const router = express.Router()

router.post("/create", iteartionController.createIteration);
module.exports = router;