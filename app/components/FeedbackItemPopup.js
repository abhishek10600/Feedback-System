import React, { useState } from 'react'
import Popup from './Popup'
import Button from './Button'
import FeedbackItemPopupComments from './FeedbackItemPopupComments'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { MoonLoader } from 'react-spinners'
import Attachment from './Attachment'

const FeedbackItemPopup = ({ _id, title, description, setShow, votes, onVotesChange, uploads }) => {
    const { data: session } = useSession();
    const [votesLoading, setVotesLoading] = useState(false);
    const isLoggedIn = !!session?.user?.email;
    const handleVoteButtonClick = async (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            localStorage.setItem("vote_after_login", _id);
        } else {
            setVotesLoading(true);
            await axios.post("/api/vote", { feedbackId: _id })
            await onVotesChange();
            setVotesLoading(false);
        }
    }
    const didIVote = votes.find(v => v.userEmail === session?.user?.email);
    return (
        <Popup setShow={setShow} title="Details">
            <div className="p-8 pb-2">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-gray-600 text-justify">{description}</p>
                {uploads?.length > 0 && (
                    <div>
                        <p>Attachments</p>
                        <div className="flex gap-6 my-4">
                            {uploads.map(link => (
                                <Attachment key={link} link={link} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-end px-8 py-2 border-b">
                <Button primary onClick={handleVoteButtonClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    {!votesLoading && (
                        <>
                            {didIVote && (
                                <>
                                    Upvoted
                                </>
                            )}
                            {!didIVote && (
                                <>
                                    Upvote {votes?.length || "0"}
                                </>
                            )}
                        </>
                    )}
                    {votesLoading && (
                        <MoonLoader size={18} />
                    )}
                </Button>
            </div>
            <div>
                <FeedbackItemPopupComments feedbackId={_id} />
            </div>
        </Popup>
    )
}

export default FeedbackItemPopup