/**
 * This code sets up a web server using the Express framework in Node.js, 
 * designed to manage user data stored in a PostgreSQL database. It allows for 
 * creating a user table, adding new users, fetching all users, updating user 
 * information, and deleting users through various API endpoints. 
 * The server also includes middleware for parsing JSON request bodies, 
 * logging requests, handling 404 errors, and dealing with server errors. 
 * The server leverages HTTP methods GET, POST, PUT, and DELETE to
 * facilitate CRUD (Create, Read, Update, Delete) operations.
 * 
 * The client can make 
 * 
 * 
 * Note: The following SQL commands should be executed in the PostgreSQL database directly.
 * These commands create the necessary role and database for the application to connect to.
 * 
 * CREATE ROLE aditya WITH LOGIN PASSWORD 'aditya';
 * CREATE DATABASE bizinc OWNER aditya;
 * GRANT ALL PRIVILEGES ON DATABASE bizinc TO aditya;
 * 
 */

const express = require('express'); // For creating the Express server
const app = express(); // Initializing the Express application
const pg = require('pg'); // For interacting with PostgreSQL database

// Middleware to parse JSON bodies
app.use(express.json());

// PostgreSQL connection pool configuration
const pool = new pg.Pool({
    user: 'aditya', // Database user name
    host: 'localhost', // Database host
    database: 'bizinc', // Database name
    password: 'aditya', // Database password
    port: 5432, // Database port
});

// Middleware to log requests
const requestLoggerMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Pass control to the next middleware/function
};

// Applying the request logging middleware to all incoming requests
app.use(requestLoggerMiddleware);

// Function to create the users table if it doesn't exist
async function createTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            email VARCHAR(100) NOT NULL
        )`;
    try {
        const client = await pool.connect(); // Connect to the database
        await client.query(createTableQuery); // Execute the query
        console.log('User table created successfully');
        client.release(); // Release the client back to the pool
    } catch (err) {
        console.error('Error creating user table:', err);
    }
}

// Function to create a new user in the database
async function createUser(id, username, email) {
    const insertQuery = `
        INSERT INTO users (id, username, email)
        VALUES ($1, $2, $3)
        RETURNING id
    `;
    try {
        const client = await pool.connect();
        const result = await client.query(insertQuery, [id, username, email]);
        const userId = result.rows[0].id;
        console.log('User created with ID:', userId);
        client.release();
        return userId;
    } catch (err) {
        console.error('Error creating user:', err);
        throw err;
    }
}

// Function to retrieve all users from the database
async function getUsers() {
    const query = `
        SELECT id, username, email
        FROM users
    `;

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        const users = result.rows;
        client.release();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Function to update a user's information
async function updateUser(id, newUsername, newEmail) {
    const query = `
        UPDATE users
        SET username = $1, email = $2
        WHERE id = $3
    `;

    try {
        const client = await pool.connect();
        await client.query(query, [newUsername, newEmail, id]);
        client.release();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Function to delete a user from the database
async function deleteUser(id) {
    const query = `
        DELETE FROM users
        WHERE id = $1
    `;

    try {
        const client = await pool.connect();
        await client.query(query, [id]);
        client.release();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// Root endpoint to create the users table and send a greeting
app.get('/', (req, res) => {
    createTable();
    res.send('Hello!');
});

// Endpoint to create a new user
app.post('/api/createUser', async (req, res) => {
    // Extract username and email from the request body
    const { username, email } = req.body;
    // Generate a random user ID
    const userId = Math.floor(Math.random() * 90000) + 10000;
    if (!username || !email) {
        res.status(400).send('Missing username or email');
    } else {
        await createUser(userId, username, email)
        res.status(200).send(`User ${username} with email ${email} created successfully.`);
    }
});

// Endpoint to retrieve all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to update a user's information
app.put('/api/users/:id', async (req, res) => {
    const userId = req.params.id; // Extracting user ID from URL parameters
    const { Username, Email } = req.body; // Extracting the new username and email from request body

    try {
        await updateUser(userId, Username, Email); // Call the updateUser function
        res.json({ message: 'User updated successfully' }); // Response back to client
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors
    }
});

// Endpoint to delete a user
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id; // Extracting user ID from URL parameters
    try {
        await deleteUser(userId); // Call the deleteUser function
        res.json({ message: 'User deleted successfully' }); // Response back to client
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle any errors
    }
});

// Middleware for handling 404 Not Found errors
// This middleware will catch any requests that do not match the routes defined above
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' }); // Send a 404 Not Found response
});

// Error handling middleware
// This middleware catches any errors that occur during request processing
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).json({ error: 'Something broke!' }); // Send a 500 Internal Server Error response
});

// Start the Express server on port 3000
app.listen(3000, () => console.log('listening on port 3000.'));
