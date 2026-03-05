import playlistModel from "../Models/playlist.schema.js";
import songModel from "../Models/song.schema.js";
import userModel from "../Models/user.Schema.js";

export const createSong = async(req,res)=>{
    try {
        const {name,thumbNail,track,duration} = req.body
        const artist = req.user

        if(!name || !thumbNail || !track)
        {
            return res.status(301).send({success:false,message:"Insufficient details to create song"})
        }

        const newSong = await songModel.create({name,thumbNail,track,duration,artist})

        res.status(200).send({success : true,newSong})
        
    } 
    catch (error) 
    {
        res.status(500).send({success : false, message : "error in creating song"})
    }
    

}

export const getCertainSongs = async(req,res) =>{
    try {
        const songs = await songModel.find().populate('artist').limit(5)


        res.status(200).send({success : true,songs})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success : false, message : "error in getting all songs"})
    }
}
export const getAllSongs = async(req,res) =>{
    try {
        const songs = await songModel.find().populate('artist')


        res.status(200).send({success : true,songs})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success : false, message : "error in getting all songs"})
    }
}

export const getMySongs = async(req,res)=>{
    try {
        
        const artist = req.user
        const mySongs = await songModel.find({artist:req.user._id}).populate('artist')   
        res.status(200).send({success : true,mySongs})
        
    } 
    catch (error) 
    {
        res.status(500).send({success : false, message : "error in getting my song"})
    }
    

}

export const getSongsOfArtist = async(req,res) =>{
    try {
        const {artistId} = req.params

        const artist = await userModel.findById(artistId)
        if(!artist){
            
            return res.status(301).send({success : false, message : "Artist does not exist"})

        }

        const songs = await songModel.find({artist:artistId})
        res.status(200).send({success : true,songs})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success : false, message : "error in getting artist's song"})
    }
}

export const getSongByName = async(req,res) =>{
    try {
        const {songName} = req.params

        const song = await songModel.find({name:{$regex :songName ,$options : "i"}})

        if(song.length < 1){
            
            return res.status(301).send({success : false, message : "No matches found"})

        }

        res.status(200).send({success : true,song})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success : false, message : "error in getting song by name"})
    }
}

export const getSongById = async(req,res) =>{
    try {
        const {id} = req.params
        const song = await songModel.findById(id).populate('artist')    
        
        if(!song){
            
            return res.status(301).send({success : false, message : "No matches found"})

        }

        res.status(200).send({success : true,song})
        
    } 
    catch (error) 
    {
        console.log("ldjdj",error);
        res.status(500).send({success : false, message : "error in getting song by name"})
    }
}




export const searchSongs = async(req,res) =>{
   try {
    const searchText = req.body.searchText
    
    let result = []

    if(searchText.length === 0)
    {
        return res.status(200).send({success:true,result})
    }
    

    const SongResult = await songModel.find({name:{$regex :searchText ,$options : "i"}}).populate('artist')   
    const playlistResult = await playlistModel.find({name:{$regex :searchText ,$options : "i"}}).populate('owner')   
    result= [...SongResult,...playlistResult]
 
    res.status(200).send({success:true,result})
   } 
   catch (error) 
   {
    console.log(error);
    res.status(500).send({success:false,error})
   }
}


export const searchOnlySongs = async(req,res) =>{
    try {
     const searchText = req.body.searchText
     
     let result = []
 
     if(searchText.length === 0)
     {
         return res.status(200).send({success:true,result})
     }
     
 
     result = await songModel.find({name:{$regex :searchText ,$options : "i"}}).populate('artist')   
  
     res.status(200).send({success:true,result})
    } 
    catch (error) 
    {
     console.log(error);
     res.status(500).send({success:false,error})
    }
 }


 export const deleteSongById = async(req,res) =>{
    try {
        const {id} = req.params

        const song = await songModel.findByIdAndDelete(id)   
        
        
        if(!song){
            
            return res.status(301).send({success : false, message : "No matches found"})

        }

        res.status(200).send({success : true})
        
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({success : false, message : "error in deleting song"})
    }
}