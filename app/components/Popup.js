import React from 'react'
import Button from './Button'

const Popup = ({ setShow, children, title }) => {
    const close = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setShow(false);
    }
    return (
        <div className="fixed inset-0 bd-white md:bg-black md:bg-opacity-80 flex md:items-center">
            <button onClick={close} className="hidden md:block fixed top-4 right-4 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

            </button>
            <div className="w-full">
                <div className="bg-white md:max-w-2xl md:mx-auto md:rounded-lg overflow-hidden">
                    <div className="relative">
                        <button onClick={close} className="absolute top-4 left-8 text-gray-600 md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </button>
                        <h2 className="py-4 text-center border-b">{title}</h2>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Popup