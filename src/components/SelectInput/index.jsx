import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

const SelectInput = (props) => {
    const { value, label, handleState, listOption} = props



  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name={name}
            value={value}   
            label={label}
            onChange={(e)=> handleState(e.target.value)}
        >
        <MenuItem value={0} disabled sx={{ color: 'gray'}}></MenuItem>
        {listOption && listOption?.map((value, i) => <MenuItem key={i} value={value.value}>{ value.label }</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}

SelectInput.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    handleState: PropTypes.func,
    listOption: PropTypes.array
}

export default SelectInput;