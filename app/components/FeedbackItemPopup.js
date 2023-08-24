import React from 'react'
import Popup from './Popup'
import Button from './Button'
import FeedbackItemPopupComments from './FeedbackItemPopupComments'

const FeedbackItemPopup = ({ title, description, setShow, votesCount }) => {
    return (
        <Popup setShow={setShow} title="Details">
            <div className="p-8 pb-2">
                <h2 className="text-lg font-bold mb-2">{title}</h2>
                <p className="text-gray-600 text-justify">{description}</p>
            </div>
            <div className="flex justify-end px-8 py-2 border-b">
                <Button primary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    Upvote {votesCount}
                </Button>
            </div>
            <div>
                <FeedbackItemPopupComments />
            </div>
        </Popup>
    )
}

export default FeedbackItemPopup