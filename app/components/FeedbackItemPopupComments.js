import React, { useState } from 'react'
import Button from './Button'
import Avatar from './Avatar';
import CommentForm from './CommentForm';

const FeedbackItemPopupComments = ({ feedbackId }) => {
    return (
        <div className="p-8">
            <div className="flex gap-4 mb-8">
                <Avatar />
                <div>
                    <p className="text-justify text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores et placeat autem facilis, doloremque hic reiciendis ut quia ipsam, recusandae odio id corporis nostrum iste corrupti asperiores labore. Quibusdam, quod.</p>
                    <div className="text-gray-400 mt-2 text-sm">Abhishek Sharma &middot; a few seconds ago</div>
                </div>
            </div>
            <CommentForm feedbackId={feedbackId} />
        </div>
    )
}

export default FeedbackItemPopupComments