const express = require("express")
const suggestController = require("../controllers/suggestController");
const router = express.Router()


router.get("/post", suggestController.getPosts);
router.post("/", suggestController.createSuggestion);
module.exports = router;