// /api/score.js

const mongoose = require('mongoose');
const cors = require('cors');

// --- Define the Score Model (from your models/Score.js) ---
const scoreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    loop: {
        type: Number,
        required: true
    }
});
// Avoid recompiling the model if it's already been compiled
const Score = mongoose.models.score || mongoose.model('score', scoreSchema);


// --- Database Connection ---
// We cache the connection so we don't have to reconnect on every request.
let cachedDb = null;
async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    // IMPORTANT: Get the connection string from Vercel Environment Variables
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('Please define the MONGO_URI environment variable inside Vercel.');
    }
    const db = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    cachedDb = db;
    return db;
}

// --- Main API Handler ---
// This is the function that Vercel will run.
export default async function handler(req, res) {
    // Apply CORS middleware
    await new Promise((resolve, reject) => {
        cors()(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });

    try {
        await connectToDatabase();

        // Handle GET requests to fetch all scores
        if (req.method === 'GET') {
            const scores = await Score.find({}).sort({ score: -1 }).limit(10);
            res.status(200).json({ success: true, data: scores });
        }
        // Handle POST requests to add a new score
        else if (req.method === 'POST') {
            const { username, score, loop } = req.body;

            if (!username || !score || !loop) {
                return res.status(400).json({ success: false, message: 'Missing required fields: username, score, loop' });
            }

            const newScore = new Score({
                username,
                score,
                loop
            });
            await newScore.save();
            res.status(201).json({ success: true, data: newScore });
        }
        // Handle other methods
        else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
    }
}
