import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  //Validates entire form
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false
    });

    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProp = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const result = Joi.validate(obj, schema);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    //const errors = { ...this.state.errors };
    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data });

    const errorMessage = this.validateProp(input);
    this.setState({ errors: errorMessage || {} });
  };

  renderButton = label => {
    return (
      <button
        type="submit"
        className="btn btn-primary"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };

  renderInput = (property, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        target={property}
        label={label}
        onChange={this.handleChange}
        value={data[property]}
        type={type}
        errors={errors[property]}
      ></Input>
    );
  };

  renderDropDown = (name, label, data) => {
    //const { errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          onChange={this.handleChange}
          className="from-control"
          id={name}
          name={name}
        >
          <option value=""></option>
          {data.map(item => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {/* {errors && <div className="alert alert-danger">{errors[name]}</div>} */}
      </div>
    );
  };
}

export default Form;
