# Simple Node (Express) Authentication

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

Clone the repository to your local machine:

```bash
git clone git@github.com:johnull/user-auth-system.git
cd user-auth-system
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
DATABASE_PASS=your_database_password
DATABASE_USER=your_database_user
DATABASE_NAME=your_database_name
DATABASE_HOST=localhost
SERVER_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```
### Usage
To create user table for Passport signup and login, run `node scripts/create_database.js

To **register** a new user, navigate to /register and fill out the registration form.

To **login**, navigate to /login and enter your email and password.

To get the user profile, send a `GET` request to `/api/profile` with the JWT token in the Authorization header:

```bash

curl -H "Authorization: Bearer <your-jwt-token>" http://localhost:3000/api/profile
```

**Example Response**

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@email.com",
  "password": "$2b$10$.QQcVwuMiB5KD5KhWa/ka.O.EGAOoPuZMZTlEqOIFFIInIMBp0ivu"
}
```

### Routes

    * GET /login: Renders the login page.
    * POST /login: Authenticates the user and returns a JWT token.
    * GET /register: Renders the registration page.
    * POST /register: Registers a new user.
    * GET /api/profile: Returns the authenticated user's profile. Requires JWT token.

After logging in, you will receive a JWT token that you can use to access protected routes.
