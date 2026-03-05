import playlistModel from "../Models/playlist.schema.js";
import songModel from "../Models/song.schema.js";
import userModel from "../Models/user.Schema.js";


export const createPlaylist = async (req, res) => {
    try {

        const { name, thumbNail, songs } = req.body
        const currentUser = req.user
        // if(!name)
        // {
        //     const totalplaylist =  await playlistModel.find({owner:req.user._id})
        //     name = `my playlist #${totalplaylist.length + 1}`
        //     console.log(name);
        // }

        const playlist = {
            name,
            thumbNail,
            songs,
            owner: currentUser._id,
            collaborators: []
        }

        const newPlaylist = await playlistModel.create(playlist)

        res.status(200).send({ success: true, newPlaylist })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ success: true, message: "Error in creating playlist" })
    }
}

export const getPlaylistById = async (req, res) => {
    try {
        const playlistId = req.params.id
        const playList = await playlistModel.findById(playlistId).populate({
            path: 'songs',
            populate: {
                path: 'artist',
                model: 'userModel'
            }
        })
        if (!playList) {
            return res.status(301).send({ success: false, message: "Invalid ID" })

        }
        res.status(200).send({ success: true, playList })

    }
    catch (error) {
        console.log("getPlaylistById", error);
        res.status(500).send({ success: false, message: "Error in getting playlist" })
    }
}

export const getCertainPlaylist = async (req, res) => {
    try {

        const playList = await playlistModel.find().limit(5)

        res.status(200).send({ success: true, playList })

    }
    catch (error) {
        console.log("getPlaylistById", error);
        res.status(500).send({ success: false, message: "Error in getting playlist" })
    }
}

export const getAllPlaylist = async (req, res) => {
    try {

        const playlist = await playlistModel.find()

        res.status(200).send({ success: true, playlist })

    }
    catch (error) {
        console.log("getPlaylistById", error);
        res.status(500).send({ success: false, message: "Error in getting playlist" })
    }
}

export const getPlaylistByArtistId = async (req, res) => {
    try {

        const artistId = req.user._id

        const artist = await userModel.findById(req.user._id)

        if (!artist) {
            return res.status(301).send({ success: false, message: "Invalid ID" })
        }

        const playList = await playlistModel.find({ owner: artistId }).populate('songs')


        res.status(200).send({ success: true, playList })

    }
    catch (error) {
        console.log("getPlaylistByArtistId", error);
        res.status(500).send({ success: false, message: "Error in getting playlist" })
    }
}


export const addSongToPlaylist = async (req, res) => {
    try {
        const currentUser = req.user

        const { playlistId, songId } = req.body

        const playlist = await playlistModel.findById(playlistId)

        if (!playlist) {
            return res.status(304).send({ success: false, message: "Playlist does not exist" })
        }


        if (playlist.owner.toString() !== currentUser._id.toString() && (!playlist.collaborators || !playlist.collaborators.includes(currentUser._id))) {
            return res.status(400).send({ success: false, message: "Not Allowed" })
        }

        const song = await songModel.find({ _id: songId })

        if (!song) {
            return res.status(304).send({ success: false, message: "Song does not exist" })
        }

        playlist.songs.push(songId)
        playlist.save()




        res.status(200).send({ success: true, playlist })

    }
    catch (error) {
        console.log("addSongToPlaylist", error);
        res.status(500).send({ success: false, message: "Error in getting playlist" })
    }
}


export const deleteSongInPlaylist = async (req, res) => {
    try {
        const currentUser = req.user;
        const { playlistId, songId } = req.body;

        const playlist = await playlistModel.findById(playlistId);

        if (!playlist) {
            return res.status(404).send({ success: false, message: "Playlist does not exist" });
        }

        if (playlist.owner.toString() !== currentUser._id.toString() && (!playlist.collaborators || !playlist.collaborators.includes(currentUser._id))) {
            return res.status(403).send({ success: false, message: "Not allowed" });
        }

        // Remove the songId from the playlist's songs array
        const index = playlist.songs.indexOf(songId);
        if (index !== -1) {
            playlist.songs.splice(index, 1);
            await playlist.save();
            return res.status(200).send({ success: true, message: "Song deleted from playlist" });
        } else {
            return res.status(404).send({ success: false, message: "Song not found in playlist" });
        }
    }
    catch (error) {
        console.error("deleteSongInPlaylist", error);
        res.status(500).send({ success: false, message: "Error in deleting song from playlist" });
    }
};



export const changePlaylistName = async (req, res) => {
    try {
        const { id } = req.params
        const { newName } = req.body



        const playlist = await playlistModel.findByIdAndUpdate(id, {
            name: newName
        }, { new: true })

        res.status(200).send({ success: true, playlist })

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error in deleting song from playlist" });

    }


}


export const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;

        const playlist = await playlistModel.findByIdAndDelete(id);

        if (!playlist) {
            return res.status(404).send({ success: false, message: "Playlist not found" });
        }

        res.status(200).send({ success: true });

    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Error in deleting playlist" });
    }
}


