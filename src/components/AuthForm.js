import React, { Component } from "react";
import Input from "./Input";
import Login from "./Login";
import Signup from "./Signup";
import { setJwt } from "../services/auth";
class AuthForm extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        email: "",
        password: "",
        username: "",
        firstname: "",
        lastname: "",
        phone: "",
        gender: "",
        location: ""

      }
    };
  }

  componentDidMount() {
    console.log("gggggggg \n\n\n\n\n", this.props)

    if (this.props.userInfo) {

      console.log("printing user infor ", this.props.userInfo)
      this.setState({})
      // username: this.props.userInfo != null ? this.props.userInfo.username : '',
      // firstname: this.props.userInfo != null ? this.props.userInfo.firstname : '',
      // lastname: this.props.userInfo != null ? this.props.userInfo.lastname : '',
      // phone: this.props.userInfo != null ? this.props.userInfo.phone : '',
      // gender: this.props.userInfo != null ? this.props.userInfo.gender : '',
      // location: this.props.userInfo != null ? this.props.userInfo.location : '',
      // id: this.props.userInfo != null ? this.props.userInfo.id : null
    }
  }

  handleRequest(user) {
    let apiUrl = "http://localhost:3000";

    apiUrl += this.props.form === "signup" ? "/auth/signup" : "/auth";
    console.log("\n\n\n\n\n", apiUrl);

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
    console.log(" handiling changes ", input)
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  handleOptionChange = (e) => {
    console.log(" handiling changes ", e.target.value)
    console.log(" handiling changes ", e.target.name)

    const data = { ...this.state.data };
    data[e.target.name] = e.target.value;
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
      <div className="p-5 bt-5">
        {this.props.form === "signup" ? (
          <Signup
            renderInput={this.renderInput}
            handleSubmit={this.handleSubmit}
            onChange={this.handleOptionChange}
            gender={this.state.data.gender}
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