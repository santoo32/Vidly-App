import Form from "./form";
import React from "react";
import Joi from "joi-browser";
import * as loginService from "./../../services/loginService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  async doSubmit() {
    const { data: account } = this.state;
    try {
      const { headers } = await loginService.register(account);

      //Automatically loged in on registration
      localStorage.setItem("loginToken", headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response.status === 400) {
        const { errors } = this.state;
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
