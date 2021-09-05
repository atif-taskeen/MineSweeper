import React from "react";
import TextField from '@material-ui/core/TextField';

const TextFieldWrapper = ({config}) => {
  
  return (
    <ul className="text-field-listing">
      {
        config.map(item => 
          <li key={item.label} item xs={3}>
            <TextField label={item.label} value={item.value} disabled={item.disable}/>
          </li>
        )
      } 
    </ul>
  );
};

export default TextFieldWrapper;
