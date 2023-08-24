import mongoose from "mongoose";

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        connection.on("error", (error) => {
            console.log("MongoDB connection error");
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }
}