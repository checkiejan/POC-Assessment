const express = require("express")
const missionController = require("../controllers/missionController");
const router = express.Router()

router.post("/", missionController.getPosts);
router.post("/add", missionController.addMission);
router.post("/get", missionController.getAllMissionsByIterationID);
router.post("/delete",missionController.deleteMission)
module.exports = router;