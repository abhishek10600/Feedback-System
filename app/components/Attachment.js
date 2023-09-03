import React from 'react'
import Image from 'next/image';
import Trash from './icons/Trash';

const Attachment = ({ link, showRemoveButton = false, removeFileUploadButtonClick }) => {
    return (
        <a href={link} target="_blank" className="h-16 relative">
            {showRemoveButton && (
                <button className="-right-2 -top-2 absolute bg-red-400 p-1 rounded-md text-white" onClick={(ev) => removeFileUploadButtonClick(ev, link)}>
                    <Trash />
                </button>
            )}
            {link.endsWith('.jpg') || link.endsWith('.jpeg') || link.endsWith('.png') ? (
                <Image className="rounded-md" width="150" height="150" src={link} alt="" />
            ) : (
                <div>
                    <p className="text-red-500">Not an image</p>
                </div>
            )}
        </a>
    )
}

export default Attachment