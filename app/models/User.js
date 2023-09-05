import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        image: String,
        emailVerified: Date
    },
);

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;