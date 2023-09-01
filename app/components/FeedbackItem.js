import React, { useState } from 'react'
import Popup from './Popup';
import Button from "./Button";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { MoonLoader } from 'react-spinners';

const FeedbackItem = ({ onOpen, _id, title, description, votes, onVotesChange }) => {
    const { data: session } = useSession();
    const [showLoginPopup, setShowLoginPopup] = useState(false);
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
    const handleGoogleLoginButtonClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        signIn("google");
    }
    const didIVote = !!votes.find(v => v.userEmail === session?.user?.email)

    return (
        <a href="" onClick={e => { e.preventDefault(); onOpen(); }} className="my-8 flex gap-8 items-center">
            <div className="flex-grow">
                <h2 className="font-bold">{title}</h2>
                <p className="text-gray-600 text-sm">{description}.</p>
            </div>
            <div>
                {showLoginPopup && (
                    <Popup setShow={setShowLoginPopup} title={"You want to vote?"}>
                        <div className="p-4">
                            <Button primary onClick={handleGoogleLoginButtonClick}>Login with Google</Button>
                        </div>
                    </Popup>
                )}
                <Button primary={didIVote} onClick={handleVoteButtonClick} className="shadow-md border">
                    {!votesLoading && (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                            </svg>
                            {votes?.length || 0}
                        </>
                    )}
                    {votesLoading && (
                        <MoonLoader size={18} />
                    )}
                </Button>
            </div>
        </a>
    )
}

export default FeedbackItem
