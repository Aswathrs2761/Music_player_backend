import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from "./Config/dbConnection.js";
import userRouter from "./Routers/User.routers.js";
import songRouter from "./Routers/Song.router.js";
import playlistRouter from "./Routers/playlist.router.js";

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/song',songRouter)
app.use('/api/playlist',playlistRouter)

connectDB()

app.listen(port,()=>{
    console.log("app is listening to PORT",port);
})
