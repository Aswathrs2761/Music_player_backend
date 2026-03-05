import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async() =>{
    
    try{
        const Connection = await mongoose.connect(process.env.MONGODBURL)
        console.log("Database Connected Successfully");
        return Connection
    }
    catch(error)
    {
        console.log(error);
    }
}

export default connectDB;