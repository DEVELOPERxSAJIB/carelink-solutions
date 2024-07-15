import React, { useState } from "react";
import Select from "react-select";

const SingleSearchSelect = ({
  options,selected,setSelected
}) => {
 
  return (
    <div className="App">
      <Select
        defaultValue={selected}
        onChange={setSelected}
        options={options??[]}
      />
    </div>
  );
};
export default SingleSearchSelect;
