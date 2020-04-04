import React from "react";

const Input = ({ target, label, value, onChange, type, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={target}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={target}
        //ref={this.username}
        name={target}
        value={value}
        onChange={onChange}
      ></input>
      {errors && <div className="alert alert-danger">{errors}</div>}
    </div>
  );
};

export default Input;
