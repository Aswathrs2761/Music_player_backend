import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    emailId: {
      type: String,
      required: true,
      unique: true,
    },

    userName: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    /* ---------- LIKED SONGS ---------- */

    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "songModel",
      },
    ],

    /* ---------- LIKED PLAYLISTS ---------- */

    likedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "playlistModel",
      },
    ],

    /* ---------- SUBSCRIBED ARTISTS ---------- */

    subscribedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },

  { timestamps: true }
);

const userModel = mongoose.model("userModel", userSchema);

export default userModel;