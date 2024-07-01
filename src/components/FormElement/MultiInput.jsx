import { useState } from 'react';

const MultiInput = () => {
  // State to store the current input value
  const [inputValue, setInputValue] = useState('');
  
  // State to store the list of values
  const [values, setValues] = useState([]);

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Enter key press to add the input value to the list
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputValue.trim() !== '') {
        setValues([...values, inputValue]);
        setInputValue('');
      }
    }
  };

  // Remove value from the list
  const handleRemoveValue = (indexToRemove) => {
    setValues(values.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="multi-input-container">
      <div className="input-wrapper">
        {values.map((value, index) => (
          <span key={index} className="tag" onClick={() => handleRemoveValue(index)}>
            {value} &times;
          </span>
        ))}
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter a value and press Enter"
        />
      </div>
    </div>
  );
};

export default MultiInput;
