import mongoose from "mongoose";
import dotenv from 'dotenv'; 
dotenv.config();

export const connectDB = async () => {
    try {
        console.log('env: ',process.env.URLMONGO);
        await mongoose.connect(process.env.URLMONGO)
        console.log('----------db is connected');
    } catch (error) {
        console.log('-------Error connectDB'); 
        console.log(error);  
    }  
}


