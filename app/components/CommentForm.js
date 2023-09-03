import React, { useState } from 'react'
import Button from './Button';
import AttachFilesButton from './AttachFilesButton';

const CommentForm = () => {
    const [commentText, setCommentText] = useState("");
    return (
        <form>
            <textarea className="border rounded-md w-full p-2" placeholder="Let us know what you think..." value={commentText} onChange={e => setCommentText(e.target.value)} />
            <div className="flex justify-end gap-2 mt-2">
                <AttachFilesButton isUploading={false} onInputChange />
                <Button primary disabled={commentText === ""}>Comment</Button>
            </div>
        </form>
    )
}

export default CommentForm