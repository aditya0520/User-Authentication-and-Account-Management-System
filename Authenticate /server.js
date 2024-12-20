
/** Implementation of local strategy for authentication using email and password stored 
 *  in a PostgreSQL table 'users'. 
 *  The user sends a POST request containing email and password to attempt a login. 
 *  Only if successful, the API redirects to the '/dashboard' endpoint; otherwise, it returns a failure response.
 */

const express = require('express'); // For creating the server and routing
const session = require('express-session'); // For session management
const crypto = require('crypto'); // For generating a secure session secret
const passport = require('passport'); // For authentication
const LocalStrategy = require('passport-local').Strategy; // Strategy for username/password authentication
const bcrypt = require('bcryptjs'); // For password hashing and verification
const { Pool } = require('pg'); // PostgreSQL client for node.js

// Create a new pool of connections for accessing the PostgreSQL database
const pool = new Pool({
    user: 'aditya', 
    host: 'localhost',
    database: 'userinfo', 
    password: 'aditya', 
    port: 5432,
});

// Initialize Express app
const app = express();

// Configure session middleware
app.use(session({
    secret: crypto.randomBytes(64).toString('hex'), // Generates a random string for the session secret
    resave: false, 
    saveUninitialized: false, 
    cookie: { secure: false } 
}));

// Middleware to parse URL-encoded data (from forms, etc.)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

// Initialize Passport and session for authentication
app.use(passport.initialize());
app.use(passport.session());

// Configure the local strategy for use by Passport.
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Query the database for a user with the given email
    pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
        if (err) return done(err); // Database error
        if (result.rows.length === 0) {
            // No user found with that email
            return done(null, false, { message: 'Incorrect email.' });
        }

        const user = result.rows[0]; // The found user
        // Compare provided password with stored hash
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return done(err); // Error during comparison
            if (!isMatch) {
                // Passwords do not match
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user); // Successful login
        });
    });
}));

// Serialize user for storing in the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) return done(err); // Database error
        const user = result.rows[0]; // The user object
        done(null, user); // Success
    });
});

// Route to handle login attempts
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // Error in authentication process
        }
        if (!user) {
            // Authentication failed
            res.json({ message: info });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err); // Error in login process
            }
            return res.redirect('/dashboard'); // Redirect to dashboard on success
        });
    })(req, res, next);
});

// Route for the dashboard, accessible only if authenticated
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // User is authenticated
        res.json({ message: 'Welcome to the dashboard!' });
    } else {
        // User is not authenticated
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
