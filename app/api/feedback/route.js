import Feedback from "@/app/models/Feedback";
import { connect } from "@/app/utils/DbConfog";

connect();

export const POST = async (request) => {
    const { title, description, uploads } = await request.json();
    await Feedback.create({ title, description, uploads });
    return Response.json(
        {
            success: true,
            message: "Feedback added succesfully"
        },
        {
            status: 201
        }
    )
}

export const GET = async () => {
    const feedbacks = await Feedback.find();
    return Response.json(feedbacks);
}