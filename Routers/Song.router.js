import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { createSong, deleteSongById, getAllSongs, getCertainSongs, getMySongs, getSongById, getSongByName, getSongsOfArtist, searchOnlySongs, searchSongs } from "../Controllers/song.controller.js";


const router = express.Router()

router.post('/create-song',verifyToken,createSong)
router.get('/get-songs',getCertainSongs)
router.get('/get-allsongs',getAllSongs)
router.get('/get-mysong',verifyToken,getMySongs)
router.get('/get-songofartist/:artistId',verifyToken,getSongsOfArtist)
router.get('/get-songbyname/:songName',verifyToken,getSongByName)
router.get('/get-songbyid/:id',verifyToken,getSongById)
router.post('/search-songs',verifyToken,searchSongs)
router.post('/search-only-songs',verifyToken,searchOnlySongs)
router.get('/deletesongbyid/:id',verifyToken,deleteSongById)



export default router
