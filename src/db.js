import mongoose from "mongoose";
import dotenv from 'dotenv'; 

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

export const connectDB = async () => {
    try {
        const url = process.env.URLMONGO || 'mongodb://127.0.0.1/shoppingHelperdb'

        await mongoose.connect(url)
        console.log('----------db is connected');
    } catch (error) {
        console.log('-------Error connectDB'); 
        console.log(error);  
    }  
}


