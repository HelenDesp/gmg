const express = require("express");
const config = require('./config/config')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')

const scoreRoutes = require("./routes/score");

const app = express();

app.use(cors())



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/score", scoreRoutes);

mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("[Server] DB connected."))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`[Server] server has been started on port: ${port}`);
});

