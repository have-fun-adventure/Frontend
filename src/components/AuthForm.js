import React, { Component } from "react";
import Input from "./Input";
import Login from "./Login";
import Signup from "./Signup";
import { setJwt } from "../services/authService";
class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
        password: "",
        name: ""
      }
    };
  }

  handleRequest(user) {
    let apiUrl = "http://localhost:3001/api";

    apiUrl += this.props.form === "signup" ? "/users" : "/auth";
    console.log(apiUrl);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setJwt(data.token);
        this.props.onLogin();
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleSubmit = e => {
    e.preventDefault();
    this.handleRequest(this.state.data);
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (name, lable, type = "text") => {
    const { data } = this.state;
    // const data = this.state.data

    return (
      <Input
        name={name}
        lable={lable}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
  render() {
    return (
      <div>
        {this.props.form === "signup" ? (
          <Signup
            renderInput={this.renderInput}
            handleSubmit={this.handleSubmit}
          />
        ) : (
            <Login
              renderInput={this.renderInput}
              handleSubmit={this.handleSubmit}
            />
          )}
      </div>
    );
  }
}

export default AuthForm;