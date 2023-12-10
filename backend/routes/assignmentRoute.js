const express = require("express")
const assignmentController = require("../controllers/assignmentController");
const router = express.Router()

router.post("/", assignmentController.getAssignmentDescription);
module.exports = router;