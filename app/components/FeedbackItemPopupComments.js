import React, { useEffect, useState } from 'react'
import Button from './Button'
import Avatar from './Avatar';
import CommentForm from './CommentForm';
import axios from 'axios';
import Attachment from './Attachment';
import TimeAgo from 'timeago-react';

const FeedbackItemPopupComments = ({ feedbackId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        getFeedbackComments();
    }, [])
    const getFeedbackComments = async () => {
        const res = await axios.get("api/comment?feedbackId=" + feedbackId);
        setComments(res.data);
    }
    return (
        <div className="p-8">
            {comments?.length > 0 && comments.map(comment => (
                <div key={comment} className="mb-8">
                    <div className="flex gap-4">
                        <Avatar url={comment.user.image} />
                        <div>
                            <p className="text-justify text-gray-600">{comment.text}</p>
                            <div className="text-gray-400 mt-2 text-sm">
                                {comment.user.name} &middot;
                                <TimeAgo
                                    datetime={comment.createdAt}
                                    locale="en_US"
                                />
                            </div>
                            {comment.uploads?.length > 0 && (
                                <div className="flex gap-2 my-3">
                                    {comment.uploads.map(link => (
                                        <Attachment key={link} link={link} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            <CommentForm feedbackId={feedbackId} onPost={getFeedbackComments} />
        </div>
    )
}

export default FeedbackItemPopupComments