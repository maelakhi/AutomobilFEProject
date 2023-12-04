// import React from 'react'
import { IconButton, Input, InputAdornment, TextField } from '@mui/material'
import './Input.css'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react';

const InputField = ({
  name,
  type,
  placeholder,
  handleState,
  // backgroundColor='transparent',
  // radiusBorder,
}) => {

  // const handleOnchange = (e) => {
  //   handleState(e)
  // }
  // const rdStyle = {
  //   md : 'input-rd-medium'
  // }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      {/* <input
          className={`default-input ${rdStyle[radiusBorder]} ${rdStyle[radiusBorder]}`}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={(e) => handleOnchange(e.target.value)}
      /> */}
        <TextField 
          sx={{ width: '100%'}}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={handleState}
        />
    </>
  )
}

export default InputField