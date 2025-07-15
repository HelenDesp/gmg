const express = require("express");
const controller = require("../controllers/Score");
const router = express.Router();

router.get("/", controller.getAll);
router.post("/", controller.addScore);

module.exports = router;
