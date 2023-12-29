// import React from 'react'
import PropTypes from 'prop-types';
import { TextField } from '@mui/material'
import './Input.css'

const InputField = ({
  name,
  type,
  placeholder,
  handleState,
  required=false,
  error=false,
  messageValidation,
}) => {

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

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.bool,
  handleState: PropTypes.func,
  messageValidation: PropTypes.string
}

export default InputField