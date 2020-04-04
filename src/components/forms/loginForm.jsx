import React from "react";
import Joi from "joi-browser";
import { login } from "./../../services/loginService";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .min(3)
      .required()
      .label("E-mail"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  //email = React.createRef();

  // componentDidMount() {
  //   //this.email.current.focus();
  //   //instead you could use <input autoFocus ...> and delete all refs
  // }

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      const { data: jwt } = await login(email, password);
      localStorage.setItem("loginToken", jwt);

      //Keeps the previous location to redirect te user after logins
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response.status === 400) {
        const { errors } = this.state;
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "E-mail")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
