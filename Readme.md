# Music Player Backend Service

A Song API service built using **Node.js, Express.js, and MongoDB** for a Music Player application.  
This backend provides APIs to fetch and manage songs for the frontend music player.

---

## Features

- RESTful API for songs
- Fetch all songs
- Fetch song by ID
- MongoDB database using Mongoose
- Docker support for easy setup
- Modular backend architecture

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Docker
- Babel
- Nodemon

---

## Project Structure

Music_player_backend
│
├── db/                 # Database configuration  
├── src/                # Application source code  
│   ├── controllers     # Business logic  
│   ├── models          # Database models  
│   ├── routes          # API routes  
│   └── utils           # Utility functions  
│
├── .env.example        # Environment variables example  
├── Dockerfile          # Docker configuration  
├── docker-compose.yml  # Docker compose setup  
├── index.js            # Application entry point  
├── package.json  
└── README.md  

---

## Getting Started

### Clone the Repository
git clone https://github.com/Aswathrs2761/Music_player_backend.git



---

## Environment Variables

Create a `.env` file in the project root.

Example:

DB_URL=mongodb://mongo:27017/music-player
PORT=3000


If default values are acceptable, you can simply create an empty `.env` file.

---

## Run with Docker

Start the application using Docker Compose.



This will:

- Start Node.js container
- Start MongoDB container
- Install required dependencies
- Run server using nodemon
- Start API on port 3000

---

## API Routes

### Get All Songs

GET /api/songs


Returns a list of all available songs.

### Get Song by ID

GET /api/songs/:id


Returns details of a specific song.

---

## Database

- Database: MongoDB
- ORM: Mongoose
- DB URL configured using `DB_URL` in `.env`
- Songs data can be loaded from JSON or external storage

---

## Highlights

- Fully Dockerized backend service
- Express REST API
- ES6 support using Babel
- Music files can be hosted on cloud storage

---

## Future Improvements

- JWT Authentication
- Add / Delete songs API
- Playlist management
- User accounts
- Music streaming optimization

---

## License

This project is licensed under the @Aswath.

