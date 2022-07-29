import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function InputArea(props) {

    const value = props.value; 
    const setValue = props.setValue;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInput = (e) => {
    if (e.key == 'Tab') {
      e.preventDefault();
      var start = e.target.selectionStart;
      var end = e.target.selectionEnd;
  
      // set textarea value to: text before caret + tab + text after caret
      e.target.value = e.target.value.substring(0, start) +
        "\t" + e.target.value.substring(start);

    console.log(e.target.value);
  
      // put caret at right position again
      e.target.selectionStart =
        e.target.selectionEnd = start + 1;
       setValue(e.target.value);
    }
  };

  return (
    <textarea
        value={value}
        onKeyDown = {handleInput}
        onChange={handleChange}
        className = "mainText"
    />     
  );
}