import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelect = ({ options, value, onChange }) => {
  return (
    <Select
      isMulti
      closeMenuOnSelect={false}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
};



export default MultiSelect;
