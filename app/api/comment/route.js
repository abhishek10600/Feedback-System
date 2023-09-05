import { connect } from "@/app/utils/DbConfog"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Comment from "@/app/models/Comments";

connect();

export const GET = async (request) => {
    const url = new URL(request.url);
    const feedbackId = url.searchParams.get("feedbackId");
    if (feedbackId) {
        //joingin the users and comment document and some changes made in comment model and user model created.
        const feedbackCommentDoc = await Comment.find({ feedbackId: feedbackId }).populate('user')
        return Response.json(
            // Removing user email from the document taken from mongodb database before sending it to frontend as a Response.
            feedbackCommentDoc.map(doc => {
                const { userEmail, ...commentWithoutEmail } = doc.toJSON();
                const { email, ...userWithoutEmail } = commentWithoutEmail.user;
                commentWithoutEmail.user = userWithoutEmail;
                return commentWithoutEmail;
            })
        )
    }
    return Response.json(false);
}

export const POST = async (request) => {
    const { text, uploads, feedbackId } = await request.json();
    const session = await getServerSession(authOptions);
    const userEmail = session.user.email;
    const commentDoc = await Comment.create({ text, uploads, userEmail, feedbackId });
    return Response.json(commentDoc);

}