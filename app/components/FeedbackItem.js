import React from 'react'

const FeedbackItem = ({ onOpen, id, title, description, votesCount }) => {
    return (
        <a href="" onClick={e => { e.preventDefault(); onOpen(); }} className="my-8 flex gap-8 items-center">
            <div>
                <h2 className="font-bold">{title}</h2>
                <p className="text-gray-600 text-sm">{description}.</p>
            </div>
            <div>
                <button className="shadow-sm shadow-gray-200 border rounded-md py-1 px-4 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                    {votesCount}
                </button>
            </div>
        </a>
    )
}

export default FeedbackItem
