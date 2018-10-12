// Import express from 'express'
const express = require('express');

// Cors
const cors = require('cors');

// Import db
const actionDB = require('./data/helpers/actionModel.js');
const projectDB = require('./data/helpers/projectModel.js');

// Create server
const server = express();

server.use(cors()); // Use cors to connect from react
server.use(express.json()); // middleware

// Request / route handler
server.get('/', (req, res) => {
	res.send('<h1>Say Something!!</h1>');
});
// Start server
const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.log(`\n=== API running on port ${port} ===\n`);
});
