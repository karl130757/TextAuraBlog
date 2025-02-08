# TextAuraBlog

## Overview
This is a full-stack blog platform where users can write and publish text blogs. The project consists of a backend built with Node.js, Express, and TypeScript, and a frontend that interacts with the API to display and manage blog posts.

## Features
- User authentication and management
- Create, edit, and delete blog posts
- Commenting system for blog posts (feature not implemented)
- RESTful API for managing users, posts, and comments

## Tech Stack
### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework for Node.js
- **TypeScript** - Typed JavaScript for better maintainability and type-safety.
- **Database** - MongoDB

### Frontend
- Vue 3, Tailwindcss

## Database Schema
The platform consists of the following entities:

1. **User**
    - id?: string;
	- firstName?: string;
	- lastName?: string;
	- displayName?: string;
	- email?: string;
	- password?: string;
	- googleId?: string;
	- deviceToken?: string;
	- createdAt?: Date;
	- updatedAt?: Date;

2. **Post**
    - id?: string;
	- title?: string;
	- content?: string;
	- author?: string; (Foreign Key referencing User)
	- status?: string;
	- tags?: string[];
	- createdAt?: Date;
	- updatedAt?: Date;

3. **Comment**
    - id: string;
	- content: string;
	- postId: string;
	- author: string;
	- createdAt: Date;
	- updatedAt: Date;

## Setup Instructions
### Prerequisites
- Node.js installed
- Database setup

### Backend Setup
1. Clone the repository:
   ```sh
   git clone git@github.com:karl130757/TextAuraBlog.git
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables (.env file):
   ```env
   MONGODB_URI=<your-database-url>
   MONGODB_DBNAME=<your-database-name>
   JWT_SECRET=<your-secret-key>
   ```

4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## API Endpoints
### User
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a single post by ID
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Comments
- `POST /api/posts/:id/comments` - Add a comment to a post
- `GET /api/posts/:id/comments` - Get comments for a post

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

## License
This project is licensed under the MIT License.

