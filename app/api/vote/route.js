import { connect } from "@/app/utils/DbConfog"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Vote from "@/app/models/Vote";

connect();

export const GET = async (request) => {
    const url = new URL(request.url);
    if (url.searchParams.get("feedbackIds")) {
        const feedbackIds = url.searchParams.get("feedbackIds").split(",");
        const votesDocs = await Vote.find({ feedbackId: feedbackIds });
        return Response.json(votesDocs);
    }
    return Response.json([]);
}

export const POST = async (request) => {
    const { feedbackId } = await request.json();
    const session = await getServerSession(authOptions);
    const { email: userEmail } = session.user;

    //find exisiting vote
    const existingVote = await Vote.findOne({ feedbackId, userEmail });
    if (existingVote) {
        await Vote.findByIdAndDelete(existingVote._id);
        return Response.json(existingVote);
    } else {
        const VoteDoc = await Vote.create({ feedbackId, userEmail });
        return Response.json(VoteDoc);
    }
}