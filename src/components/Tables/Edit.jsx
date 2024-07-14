import React from "react";

const Edit = ({row}) => {
    const handleEditClick = (rowData) => {
        console.log(rowData)
      };
    
   
  return  <button
  className="dropdown-item"
  onClick={() => handleEditClick()}
>
  Edit
</button>;
};

export default Edit;
