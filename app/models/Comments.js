import mongoose from "mongoose";
import User from "./User";

const commentSchema = new mongoose.Schema(
    {
        text: { type: String },
        uploads: { type: [String] },
        userEmail: { type: String, required: true },
        feedbackId: { type: mongoose.Types.ObjectId, required: true }
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

commentSchema.virtual("user", {
    ref: 'User',
    localField: "userEmail",
    foreignField: "email",
    justOne: true,
});

const Comment = mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
export default Comment;