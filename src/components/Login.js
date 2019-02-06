import React from "react";

const Login = props => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        {props.renderInput("email", "Email")}
        {props.renderInput("password", "Password", "password")}
        <button className="btn btn-primary"> Login </button>
      </form>
    </div>
  );
};

export default Login;