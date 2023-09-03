import axios from 'axios';
import React, { useState } from 'react'
import { MoonLoader } from 'react-spinners'

const AttachFilesButton = ({ onNewFiles }) => {
    const [isUploading, setIsUploading] = useState(false);
    const handleAttachFilesInputChange = async (ev) => {
        ev.preventDefault();
        const files = [...ev.target.files];
        setIsUploading(true);
        const data = new FormData();
        for (const file of files) {
            data.append("file", file);
        }
        const res = await axios.post("/api/upload", data);
        onNewFiles(res.data)
        setIsUploading(false);
    }
    return (
        <label className={"flex gap-2 py-1 px-4 cursor-pointer"}>
            {isUploading && (
                <MoonLoader size={18} />
            )}
            <span className={(isUploading ? "text-gray-300" : "text-gray-600")}>{isUploading ? "Uploading..." : "Attach Files"}</span>
            <input multiple onChange={handleAttachFilesInputChange} type="file" className="hidden" />
        </label>
    )
}

export default AttachFilesButton