import mongoose from "mongoose";
/* import dotenv from 'dotenv'; 

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
} */

export const connectDB = async () => {
    try {
        //const url = process.env.URLMONGO || 'mongodb://127.0.0.1/shoppingHelperdb'
        const url = 'mongodb+srv://shopping_db_user:j04gzT9XgjIDSTwR@clustershoppinghelper.vtvfoo2.mongodb.net/?appName=ClusterShoppingHelper'
        console.log('url de ejemplo ');
        await mongoose.connect(url)
        console.log('----------db is connected');
    } catch (error) {
        console.log('-------Error connectDB'); 
        console.log(error); 
    }  
}


