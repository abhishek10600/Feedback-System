import React, { useState } from 'react'
import Popup from './Popup'
import Button from './Button'
import axios from 'axios';
import Image from 'next/image';
import Trash from './icons/Trash';
import { MoonLoader } from 'react-spinners';

const FeedbackFormPopup = ({ setShow }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploads, setUploads] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const handleCreatePostButtonClick = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/feedback", { title: title, description: description, uploads: uploads });
        if (res.data.success === true) {
            setShow(false);
        }
    }
    const handleAttachFilesInputChange = async (ev) => {
        ev.preventDefault();
        const files = [...ev.target.files];
        setIsUploading(true);
        const data = new FormData();
        for (const file of files) {
            data.append("file", file);
        }
        const res = await axios.post("/api/upload", data);
        setUploads((existingUploads) => {
            return [...existingUploads, ...res.data];
        })
        setIsUploading(false);
    }
    const removeFileUploadButtonClick = (ev, link) => {
        ev.preventDefault();
        setUploads((currentUploads) => {
            return currentUploads.filter((val) => val !== link);
        });
    }
    return (
        <Popup setShow={setShow} title={"Make a suggestion"}>
            <form className="p-8">
                <label className="block mt-4 mb-1 text-slate-700">Title</label>
                <input
                    className="w-full border p-2 rounded-md"
                    type="text" placeholder="A short, descriptive title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="block mt-4 mb-1 text-slate-700">Details</label>
                <textarea
                    className="w-full border p-2 rounded-md"
                    placeholder="Please include any details"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {uploads?.length > 0 && (
                    <div>
                        <label className="block mt-4 mb-1 text-slate-700">Files</label>
                        <div className="flex gap-3">
                            {uploads.map(link => (
                                <a href={link} target="_blank" className="h-16 relative">
                                    <button className="-right-2 -top-2 absolute bg-red-400 p-1 rounded-md text-white" onClick={(ev) => removeFileUploadButtonClick(ev, link)}>
                                        <Trash />
                                    </button>
                                    {link.endsWith('.jpg') || link.endsWith('.png') ? (
                                        <Image className="rounded-md" width="150" height="150" src={link} alt="" />
                                    ) : (
                                        <div>
                                            <p className="text-red-500">Not an image</p>
                                        </div>
                                    )}
                                </a>
                            ))
                            }
                        </div>
                    </div>
                )}
                <div className="flex gap-2 mt-6 justify-end">
                    <label className={"flex gap-2 py-1 px-4 cursor-pointer"}>
                        {isUploading && (
                            <MoonLoader size={18} />
                        )}
                        <span className={(isUploading ? "text-gray-300" : "text-gray-600")}>{isUploading ? "Uploading..." : "Attach Files"}</span>
                        <input multiple onChange={handleAttachFilesInputChange} type="file" className="hidden" />
                    </label>
                    <Button primary onClick={handleCreatePostButtonClick}>Create Post</Button>
                </div>
            </form>
        </Popup >
    )
}

export default FeedbackFormPopup