import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/shoppingHelperdb')
        console.log('----------db is connected');
    } catch (error) {
        console.log('-------Error connectDB');
        console.log(error);
    }
}


