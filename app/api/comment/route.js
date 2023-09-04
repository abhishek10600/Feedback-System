import { connect } from "@/app/utils/DbConfog"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Comment from "@/app/models/Comments";

connect();

export const POST = async (request) => {
    const { text, uploads, feedbackId } = await request.json();
    const session = await getServerSession(authOptions);
    const userEmail = session.user.email;
    const commentDoc = await Comment.create({ text, uploads, userEmail, feedbackId });
    return Response.json(commentDoc);

}