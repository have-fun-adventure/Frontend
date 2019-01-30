import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import About from "./components/About";
import UserForm from "./components/UserForm"




const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeNav: "home" ,
      userInfo: undefined,
      activityInfo: undefined,
      activityForm:false,
      // username: '',
      // loginForm: false,
      // results: [],
      userForm: false,
      // showProfile: false
 
    };
  }

  onNavClick = activeNav => {
    this.setState({ activeNav });
  };
  // show the login form to show
  // setLoginForm() {
  //   this.setState({
  //     loginForm: !this.state.loginForm,
  //     userForm: false
  //   });
  // }

  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  // handle the user name to check if he is registered or no 
  handleSubmit(event) {
    event.preventDefault();

    fetch(`${API_URL}user/${this.state.username}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          userInfo: data,
          loginForm: false
        })
      })
      .catch(error => {
        console.log('App.js handleSubmit function: ', error);
        alert({
          title: "This username NOT Registered",
          icon: "warning"
        });
      })
    console.log(this.state.userInfo);
  }
  //handel thre form sumbmission if the user to create a new user or updtae user info
  handleFormSubmit(user) {
    this.state.userInfo ? this.updateUserInfo(user) : this.createNewUser(user)
  }

  // update user information in the database 
  updateUserInfo(user) {
    console.log("##", user);
    const url = `${API_URL}user/${user.id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          userInfo: data,
          userForm: false 
        })
      })
      .catch(error => {
        console.log(error);
      })
    }
    createNewUser(user) {
      const url = `${API_URL}user`
  console.log("uuuuuuuuuuuser info",user)
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          console.log("uuuuuuuuuuuser data",data)

          this.setState({ 
            userInfo: data,
            userForm: false
           })
        })
        .catch(error => {
          console.log('createNewUser Error: ', error)
          alert("Tnis username or email is Registerd.");
        })
    }

  //handel thre form sumbmission if the user to create a new user or updtae user info
  handleFormSubmit(user) {
    this.state.userInfo ? this.updateUserInfo(user) : this.createNewUser(user)
  }

  // update user information in the database 
  updateUserInfo(user) {
    console.log("##", user);
    const url = `${API_URL}user/${user.id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          userInfo: data,
          userForm: false 
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
  handleRegister() {
    this.setState({
      userForm: !this.state.userForm,
      loginForm: false
    });
  }

  // render user form for the registeration
  renderUserForm() {
    return <UserForm userInfo={this.state.userInfo} 
                     handleFormSubmit={this.handleFormSubmit.bind(this)} 
                     handleRegister={this.handleRegister.bind(this)} 
                     />
  }

  // render the user profile component
  // renderUserProfile(){
  //   return <UserProfile user={this.state.userInfo} 
  //                       handleRegister={this.handleRegister.bind(this)} 
  //                       renderSavedJob={this.renderSavedJob.bind(this)}
  //                       setUserProfile={this.setUserProfile.bind(this)}
  //                       setSelectedJob={this.setSelectedJob.bind(this)}
  //                       />
  // }

  // claer the state for log out
  // handleLogout() {
  //   this.setState({
  //     username: '',
  //     userInfo: undefined,
  //     showProfile: false,
  //     userForm: false
  //   })
  // }
  
  //This function will render the log-in form it the login is true
  // renderLoginForm() {
  //   return (
  //     <div className="user-form">
  //       <form className="show-form" onSubmit={this.handleSubmit.bind(this)}>
  //         <div className="close-modal" onClick={ () => this.setLoginForm() }>x</div>
  //         <label>Username: </label>
  //         <input type="text" placeholder="Enter username" onChange={this.handleChange.bind(this)} />
  //         <button>Login</button>
  //       </form>
  //     </div>
  //   )
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
      <UserForm userInfo={this.state.userInfo} 
                     handleFormSubmit={this.handleFormSubmit.bind(this)} 
                     handleRegister={this.handleRegister.bind(this)} 
                     />

      </div>
    );
  }
}

export default App;
