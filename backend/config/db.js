import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database");
    }
    catch (err) {
        console.log("Connect to database has failed", err.message);
        throw err;
    }
}

export default connectDB;