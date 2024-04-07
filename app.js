const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const registrationController = require('./controllers/registrationController');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for registration
app.post('/api/register', registrationController.registerUser);

// Route for displaying the registration confirmation details
app.get('/confirmation', (req, res) => {
    const { id, fullName, address, status, fee } = req.query;
    console.log('Received confirmation request with query params:', req.query);

    // Display the registration confirmation details on a new page
    res.send(`
        <h1>Registration Confirmation</h1>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Fee:</strong> ${fee}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});