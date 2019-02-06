import React from "react";

const Input = ({ name, lable, ...rest }) => {
  return (
    <div className="form-group">
      <lable>{lable}</lable>
      <input {...rest} name={name} className="form-control  col-md-6" />
    </div>
  );
};

export default Input;