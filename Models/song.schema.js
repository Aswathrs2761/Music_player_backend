import mongoose from "mongoose";

const songSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    thumbNail:{
        type:String,
        required:false
    },
    track:{
        type : String,
        required : true
    },
    duration:{
        type:String,
        required:false
    },    
    artist:{
        type : mongoose.Types.ObjectId,
        ref : 'userModel'
    },
    

},{timestamps : true})

const songModel = mongoose.model('songModel',songSchema)
export default songModel




