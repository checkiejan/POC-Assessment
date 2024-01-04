const express = require("express")
const suggestController = require("../controllers/suggestController");
const router = express.Router()


router.post("/post", suggestController.getPosts);
router.post("/", suggestController.createSuggestion);
router.post("/v2", suggestController.createSuggestionV2);
router.post("/adjust", suggestController.createAdjustment);
router.post("/multi-query", suggestController.testMultiQuery);
module.exports = router;