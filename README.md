# User Authentication and Account Management System

This project demonstrates a comprehensive implementation of a user authentication and account management system, integrating modern technologies like React, Next.js, Node.js, and PostgreSQL.

---

## Project Overview
The system was designed to provide secure user authentication, session management, and account handling for a web application. It incorporates the following features:
- **Frontend Frameworks:** Developed using React and Next.js for interactive user interfaces and efficient routing.
- **Backend Services:** Built with Node.js to handle API requests, authentication logic, and database interactions.
- **Database Management:** Utilized PostgreSQL for robust and scalable data storage with encrypted user information.

---

## Key Features

### 1. Authentication & Authorization
- Implemented secure user authentication using Next.js and Passport.js.
- Supported OAuth for third-party login, ensuring stateless and authorized access.
- Integrated JSON Web Tokens (JWT) for managing user sessions securely.

### 2. Backend Services
- Built RESTful API endpoints using Node.js for user registration, login, and session validation.
- Developed middleware to log and monitor incoming requests for debugging and analytics.

### 3. Database Design & Interaction
- Designed a relational schema in PostgreSQL, ensuring scalability and normalized data structure.
- Created tables for Users, Posts, and Comments to support a blogging platform.
- Implemented CRUD operations for managing user accounts and content:
  - **User table** includes fields for `userID`, `firstName`, `lastName`, `email`, and `passwordHash`.
  - **Post table** links each post to a user, enabling operations like retrieving posts by specific users.
  - **Comment table** supports querying comments and associating them with posts and users.

### 4. Frontend Development
- Built React components to display user data and enable user interactions.
- Implemented Next.js routing for seamless navigation between pages.
- Integrated API data fetching to display dynamic content.

### 5. SQL Queries
- Queried posts by specific users:
  ```sql
  SELECT * FROM "Posts" WHERE "userID" = some_user_id;
  ```
- Counted comments on a specific post:
  ```sql
  SELECT "postID", COUNT(*) AS "CommentCount"
  FROM "Comments"
  WHERE "postID" = 2
  GROUP BY "postID";
  ```
- Summarized user contributions (number of posts and comments):
  ```sql
  SELECT
  u."userID",
  u."firstName",
  u."lastName",
  COUNT(p."postID") AS "NumberOfPosts",
  COUNT(c."commentID") AS "NumberOfComments"
  FROM "Users" u
  LEFT JOIN "Posts" p ON u."userID" = p."userID"
  LEFT JOIN "Comments" c ON u."userID" = c."userID"
  GROUP BY u."userID";
  ```

---

## Technical Stack
- **Frontend:** React.js, Next.js
- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js, JWT
- **Database:** PostgreSQL
- **API Integration:** RESTful APIs

---

## Challenges & Solutions

### Challenge: Ensuring secure user data storage and authentication
- **Solution:** Encrypted sensitive data like passwords and utilized JWT for stateless sessions.

### Challenge: Efficiently handling database operations for scalable account management
- **Solution:** Designed normalized database schemas and optimized SQL queries for performance.

---

## Future Enhancements
- Add two-factor authentication for improved security.
- Implement role-based access control for user permissions.
- Integrate unit tests for API endpoints and React components.

---
