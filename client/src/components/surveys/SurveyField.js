//contains logic to render a single label and text input
//cree sur l'app le form
import React from 'react';
//{...input} remplace input.onBlur, etc. fonction du form
export default ({ input, label, meta:{error, touched} }) => {
  return(
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom : '5px'}}/>
      <div className="red-text" style={{marginBottom : '20px'}}>
        {touched && error}
      </div>
    </div>
  );
};
//touched est un bouléen, si true alors erreur si empty
