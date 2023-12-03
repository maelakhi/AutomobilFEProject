// import React from 'react'
import './Input.css'

const Input = ({
  name,
  type,
  placeholder,
  handleState,
  backgroundColor='transparent',
  radiusBorder,
}) => {

  const handleOnchange = (e) => {
    handleState(e)
  }
  const rdStyle = {
    md : 'input-rd-medium'
  }

  return (
    <input
        className={`default-input ${rdStyle[radiusBorder]} ${rdStyle[radiusBorder]}`}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => handleOnchange(e.target.value)}
    />
  )
}

export default Input