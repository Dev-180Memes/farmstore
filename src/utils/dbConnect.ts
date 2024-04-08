import mongoose from "mongoose";

export const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/mydatabase";

    console.log("Connecting to database");

    await mongoose.connect(uri);

    console.log("Connected to database");

    mongoose.connection.on("error", (error) => {
        console.error(error);
    });

    return mongoose.connection;
};