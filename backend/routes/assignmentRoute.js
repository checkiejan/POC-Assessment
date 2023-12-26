const express = require("express")
const assignmentController = require("../controllers/assignmentController");
const router = express.Router()

router.post("/", assignmentController.getAssignmentDescription);
router.post("/fetch-mission", assignmentController.getIterationsWithMissions);
module.exports = router;