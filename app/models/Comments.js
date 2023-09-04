import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        text: { type: String },
        uploads: { type: [String] },
        userEmail: { type: String, required: true },
        feedbackId: { type: mongoose.Types.ObjectId, required: true }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model.Comment || mongoose.model("Comment", commentSchema);

export default Comment;