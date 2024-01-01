const express = require("express")
const missionController = require("../controllers/missionController");
const router = express.Router()

router.post("/", missionController.getPosts);
router.post("/add", missionController.addMission);
router.post("/get", missionController.getAllMissionsByIterationID);
router.post("/delete",missionController.deleteMission);
router.post("/update",missionController.updateMissionDetail);
router.post("/submit",missionController.submitMission);

module.exports = router;