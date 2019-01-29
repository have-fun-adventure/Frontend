import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import About from "./components/About";




const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeNav: "home" ,
      // userInfo:"",
      // userForm:false,
      // loginForm: true


    };
  }

  onNavClick = activeNav => {
    this.setState({ activeNav });
  };
  // handleRegister() {
  //   this.setState({
  //     userForm: !this.state.userForm,
  //     loginForm: false
  //   });
  // }
  // renderUserForm() {
  //   return <UserForm userInfo={this.state.userInfo} 
  //                    handleFormSubmit={this.handleFormSubmit.bind(this)} 
  //                    handleRegister={this.handleRegister.bind(this)} 
  //                    />
  // }

  render() {
    return (
      <div>
        <Nav
          onNavClick={this.onNavClick}
          active={this.state.activeNav}
          navs={["Home", "About", "Activity", "Trip", "Contact" , "Login"]}
          navsRef={["Home", "About", "Activity", "Trip", "Contact" , "Login"]}
        />
      <About/>

      </div>
    );
  }
}

export default App;
