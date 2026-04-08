const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read from JSON database
const readDB = () => {
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify({ submissions: [] }, null, 2));
    }
    const data = fs.readFileSync(DB_FILE);
    return JSON.parse(data);
};

// Helper function to write to JSON database
const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// API Route: Get all submissions
app.get('/api/submissions', (req, res) => {
    const db = readDB();
    res.json(db.submissions);
});

// API Route: Add a submission (Contact form)
app.get('/api/contact', (req, res) => {
    res.status(405).send('Use POST method to send contact form data.');
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const db = readDB();
    const newSubmission = {
        id: Date.now(),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
    };
    db.submissions.push(newSubmission);
    writeDB(db);

    res.status(201).json({ success: true, message: 'Form submitted successfully!' });
});

// Simple authentication for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
