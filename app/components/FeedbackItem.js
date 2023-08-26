import React, { useState } from 'react'
import Popup from './Popup';
import Button from "./Button";
import { signIn, signOut } from 'next-auth/react';

const FeedbackItem = ({ onOpen, _id, title, description, votesCount }) => {
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const isLoggedIn = false;
    const handleVoteButtonClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            localStorage.setItem("vote_after_login", _id);
        }
    }
    const handleGoogleLoginButtonClick = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        signIn("google");
    }
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
                <button onClick={handleVoteButtonClick} className="shadow-sm shadow-gray-200 border rounded-md py-1 px-4 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    {votesCount || 0}
                </button>
            </div>
        </a>
    )
}

export default FeedbackItem
