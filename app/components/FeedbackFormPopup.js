import React, { useState } from 'react'
import Popup from './Popup'
import Button from './Button'
import axios from 'axios';
import Attachment from './Attachment';
import AttachFilesButton from './AttachFilesButton';

const FeedbackFormPopup = ({ setShow, onCreate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [uploads, setUploads] = useState([]);
    const handleCreatePostButtonClick = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/feedback", { title: title, description: description, uploads: uploads });
        if (res.data.success === true) {
            setShow(false);
            onCreate();
        }
    }
    const removeFileUploadButtonClick = (ev, link) => {
        ev.stopPropagation();
        ev.preventDefault();
        setUploads((currentUploads) => {
            return currentUploads.filter((val) => val !== link);
        });
    }
    const addNewUploads = (newLinks) => {
        setUploads(prevLinks => [...prevLinks, ...newLinks])
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
                                <Attachment
                                    link={link}
                                    showRemoveButton={true}
                                    removeFileUploadButtonClick={(ev, link) => removeFileUploadButtonClick}
                                />
                            ))
                            }
                        </div>
                    </div>
                )}
                <div className="flex gap-2 mt-6 justify-end">
                    <AttachFilesButton onNewFiles={addNewUploads} />
                    <Button primary onClick={handleCreatePostButtonClick}>Create Post</Button>
                </div>
            </form>
        </Popup >
    )
}

export default FeedbackFormPopup