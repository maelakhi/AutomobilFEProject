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
  error = false,
  label,
  value,
  messageValidation,
}) => {

  return (
    <>
        <TextField 
          sx={{ width: '100%'}}
          label={label}
          name={name}
          type={type}
          value={value}
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
  label: PropTypes.string,
  messageValidation: PropTypes.string,
  value: PropTypes.any
}

export default InputField