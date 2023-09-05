import Image from 'next/image'
import React from 'react'

const Avatar = ({ url = null }) => {
    return (
        <div>
            {!!url && (
                <div className="ImageContainer rounded-full bg-blue-300 w-12 h-12 overflow-hidden">
                    <Image src={url} alt="user" width={100} height={100} />
                </div>
            )}

        </div>
    )
}

export default Avatar