import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export const POST = async (request) => {
    const links = [];
    const myS3Client = new S3Client({
        region: "ap-south-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    })
    const formData = await request.formData();
    for (const fileInfo of formData) {
        const file = fileInfo[1];
        const name = Date.now().toString() + file.name;
        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);
        await myS3Client.send(new PutObjectCommand({
            Bucket: "feedback-system-uploads",
            Key: name,
            ACL: "public-read",
            Body: buffer,
            ContentType: file.type,

        }));
        links.push("https://feedback-system-uploads.s3.amazonaws.com/" + name);
    }
    return Response.json(links);
}