/**
 * This is basic web server using the Express framework in Node.js. 
 * It includes features like logging incoming requests using a middleware, 
 * defining routes to handle GET requests (including serving JSON data), 
 * and middleware for error handling and 404 responses. 
 * The server listens on port 5000
 */

// Import the express module
const express = require('express');

// Initialize the Express application
const app = express();

// Define a JSON object
const user = {
    id: 1,
    username: 'Aditya Aayush', 
    email: 'aditya_aayush@outlook.com' 
};

// Middleware function to log details about each incoming request
const requestLoggerMiddleware = (req, res, next) => {
    // Log the current timestamp, HTTP method, and request URL
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware in the stack
};

// Apply the request logging middleware to all incoming requests
app.use(requestLoggerMiddleware);

// Define a route handler for GET requests to the root URL ('/')
app.get('/', (req, res) => {
    // Send a simple text response to the client
    res.send('Hello!');
});

// Define a route handler for GET requests to '/api/user'
app.get('/api/user', (req, res) => {
    res.setHeader('Content-Type', 'application/json'); 
    // Send the user object as a JSON response
    res.json(user);
});

// Middleware for handling 404 Not Found errors
// This will catch any requests that do not match the routes defined above
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
// This function will catch any errors that occur during the handling of requests
app.use((err, req, res, next) => {
    // Log the error stack trace to the console
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start the Express server on port 3000 and log a message to the console
app.listen(5000, () => console.log('listening on port 5000.'));
