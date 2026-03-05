import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    thumbNail: {
        type: String,
        required: false
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'userModel'
    },

    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'songModel'
        },
    ],

    collaborators: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'userModel'
        },
    ],




}, { timestamps: true })

const playlistModel = mongoose.model('playlistModel', playlistSchema)
export default playlistModel




