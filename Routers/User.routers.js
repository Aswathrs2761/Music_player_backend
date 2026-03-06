import express from "express";
import {
  addAndRemoveLikedSong,
  addLikedPlaylist,
  forgotPassword,
  getLikedPlaylists,
  getLikedPlaylistsWithDetails,
  getLikedSongs,
  loginUser,
  removeLikedPlaylist,
  resetPassword,
  registerUser
} from "../Controllers/User.controller.js";

import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:userId/:token", resetPassword);

router.post("/addorremovelikes", verifyToken, addAndRemoveLikedSong);
router.get("/getlikedsongs", verifyToken, getLikedSongs);

router.post("/addlikedplaylist", verifyToken, addLikedPlaylist);
router.post("/removelikedplaylist", verifyToken, removeLikedPlaylist);

router.get("/getlikedplaylist", verifyToken, getLikedPlaylists);
router.get("/getlikedplaylistwithdetails", verifyToken, getLikedPlaylistsWithDetails);

export default router;