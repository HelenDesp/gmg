const Score = require("../models/Score");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
    try {
        const score = await Score.find({});
        res.status(200).json(score);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.addScore = async (req, res) => {
    try {
        console.log("Request body", req.body);
        const score = await new Score ({
            username: req.body.username,
            score: req.body.score,
            loop: req.body.loop
        }).save();
        res.status(201).json(score);
    } catch (e) {
        errorHandler(res, e);
    }
}
