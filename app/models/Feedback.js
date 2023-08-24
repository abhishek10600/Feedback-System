import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        uploads: {type: [String]}
    },
    {
        timestamps: true
    }
);

const Feedback = mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;