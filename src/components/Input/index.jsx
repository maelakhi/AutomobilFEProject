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
  required=false,
  error=false,
  messageValidation,
}) => {
  // const rdStyle = {
  //   md : 'input-rd-medium'
  // }

  // const [showPassword, setShowPassword] = useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
        <TextField 
          sx={{ width: '100%'}}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={(e) => handleState(e.target.value)}
          required={required}
          error={error}
          helperText={messageValidation}
        />
    </>
  )
}

export default InputField