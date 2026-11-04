const express = require('express');
const path = require('path');
const { workingHours } = require('./middleware/working-hours');
const app = express();

// Keep styles available so the closed-hours message is styled too.
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(workingHours);
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views/home.html')));
app.get('/services', (req, res) => res.sendFile(path.join(__dirname, 'views/services.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'views/contact.html')));
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'views/not-found.html')));
module.exports = app;
