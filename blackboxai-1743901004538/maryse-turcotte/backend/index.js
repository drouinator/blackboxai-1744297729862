import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { executeCommand } from './commands.js';
import { getSystemStats } from './systemStats.js';
import { processVoiceCommand } from './voice.js';

const app = express();
const PORT = 3000;

import { logMessage } from './logging.js';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.post('/execute-command', async (req, res) => {
    try {
        const { command } = req.body;
        const result = await executeCommand(command);
        res.json({ success: true, output: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/system-stats', async (req, res) => {
    try {
        const stats = await getSystemStats();
        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/voice-command', async (req, res) => {
    try {
        const { audioData } = req.body;
        const result = await processVoiceCommand(audioData);
        res.json({ success: true, text: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/clairapp', async (req, res) => {
    try {
        const userInput = req.body.input;
        // Process the input and generate a response
        const response = {
            message: `Received input: ${userInput}`
        };
        res.json(response);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/execute-command', async (req, res) => {
    try {
        const { command } = req.body;
        logMessage(`Executing command: ${command}`); // Log the command being executed
        const result = await executeCommand(command);
        logMessage(`Command executed successfully: ${result}`); // Log the successful execution
        res.json({ success: true, output: result });
    } catch (error) {
        logMessage(`Error executing command: ${error.message}`); // Log the error
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/system-stats', async (req, res) => {
    try {
        const stats = await getSystemStats();
        logMessage(`System stats retrieved successfully`); // Log the successful retrieval
        res.json({ success: true, stats });
    } catch (error) {
        logMessage(`Error retrieving system stats: ${error.message}`); // Log the error
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/voice-command', async (req, res) => {
    try {
        const { audioData } = req.body;
        logMessage(`Processing voice command with audio data length: ${audioData?.length || 'undefined'}`); // Log the audio data length
        const result = await processVoiceCommand(audioData);
        logMessage(`Voice command processed successfully: ${result.text}`); // Log the successful processing
        res.json({ success: true, text: result.text });
    } catch (error) {
        logMessage(`Error processing voice command: ${error.message}`); // Log the error
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Clair backend running on port ${PORT}`);
});