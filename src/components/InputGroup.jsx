import React from 'react'

const InputGroup = ({errors , register , name , label , type="text" , required = true}) => {
    return (
        <div className={"form-group" + (name !== "address" ? " md:w-1/2 w-full " : "") + (errors[name] ? "invalid" : "")}>
            <label>{label} <span className="text-red-400">{required ? "*" : ""}</span></label>
            <input type={type} {...register(name)} />
            <p className="error">{errors[name]?.message}</p>
        </div>
    )
}

export default InputGroup
