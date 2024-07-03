import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const [value, setValue] = useState('');

  // Custom toolbar options including color options
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'color': [] }, { 'background': [] }],  // Include color and background color options
      ['clean']                                          // remove formatting button
    ],
  };

  return (
    <ReactQuill 
      theme="snow" 
      value={value} 
      onChange={setValue} 
      modules={modules} 
      placeholder="Write notes...." 
    />
  );
}

export default TextEditor;
