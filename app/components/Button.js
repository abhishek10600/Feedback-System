import React from 'react'

const Button = (props) => {
    const extraClasses = props?.className || "";
    return (
        <button
            {...props}
            disabled={props.disabled}
            className={
                "py-1 px-4 rounded-md  flex text-opacity-90 "
                + extraClasses
                + (props.primary ? " bg-blue-500 text-white" : " text-gray-600")
                + (props.disabled ? " text-white text-opacity-50 bg-opacity-50" : "")} />
    )
}

export default Button