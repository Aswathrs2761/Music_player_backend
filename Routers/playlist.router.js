import express from "express";
import { verifyToken } from "../Middleware/authMiddleware.js";
import { addSongToPlaylist, changePlaylistName, createPlaylist, deletePlaylist, deleteSongInPlaylist, getAllPlaylist, getCertainPlaylist, getPlaylistByArtistId, getPlaylistById } from "../Controllers/playlist.controller.js";


const router = express.Router()

router.post('/create-playlist',verifyToken,createPlaylist)
router.get('/getcretainplaylist',verifyToken,getCertainPlaylist)
router.get('/getallplaylist',verifyToken,getAllPlaylist)
router.get('/getplaylistbyid/:id',verifyToken,getPlaylistById)
router.get('/getplaylist/artist',verifyToken,getPlaylistByArtistId)
router.post('/addsong',verifyToken,addSongToPlaylist)
router.post('/deletesong',verifyToken,deleteSongInPlaylist)
router.put('/changename/:id',verifyToken,changePlaylistName)
router.delete('/deleteplaylist/:id',verifyToken,deletePlaylist)

export default router

