import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import About from "./components/About";
import UserForm from "./components/UserForm"
import Activity from "./components/Activity";
import Profile from "./components/Profile"

const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      activeNav: "home" ,
      userInfo: undefined,
      username:'',
      activityInfo: undefined,
      activityForm:false,
      loginForm: false,
      userForm: false,
      showProfile: false
 
    };
  }
// control Nav
  onNavClick = activeNav => {
    this.setState({ activeNav });
  };

  // show the login form 
  setLoginForm() {
    this.setState({
      loginForm: !this.state.loginForm,
      userForm: false
    });
  }

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
        console.log('error in submit user: ', error);
        alert("This username NOT Registered");
      })
    console.log("this.state.userInfo:" , this.state.userInfo);
  }
  //handel thre form sumbmission if the user to create a new user or updtae user info
  handleFormSubmit(user) {
    this.state.userInfo ? this.updateUserInfo(user) : this.createNewUser(user)
  }

  // update user information in the database 
  updateUserInfo(user) {
    console.log("update user info ", user);
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



      // create user information in the database 
    createNewUser(user) {
      const url = `${API_URL}user`
  console.log("create user info",user)
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(response => response.json())
        .then(data => {
          console.log("create user info  data",data)

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
  renderUserProfile(){
    return <Profile user={this.state.userInfo} 
                        handleRegister={this.handleRegister.bind(this)} 
                        setUserProfile={this.setUserProfile.bind(this)}
                        />
  }

  // claer the state for log out
  handleLogout() {
    this.setState({
      username: '',
      userInfo: undefined,
      showProfile: false,
      userForm: false
    })
  }
  
  //This function will render the log-in form it the login is true
  renderLoginForm() {
    return (
      <div className="user-form">
        <form className="show-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="close-modal" onClick={ () => this.setLoginForm() }>x</div>
          <label>Username: </label>
          <input type="text" placeholder="Enter username" onChange={this.handleChange.bind(this)} />
          <button>Login</button>
        </form>
      </div>
    )
  }

  //handel activity submit  
  handleActivitySubmit(event) {
    event.preventDefault();
    fetch(`${API_URL}activity/${this.state.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          activityInfo: data,
          activityForm: false
        })
      })
      .catch(error => {
        console.log('App.js handleSubmit function: ', error);
        
      })
    console.log(this.state.activityInfo);
  }

  handleFormActivity(activity) {
    this.state.activityInfo ? this.updateActivityInfo(activity) : this.createNewActivity(activity)
  }


   // update activity information in the database 
   updateActivityInfo(activity) {
    console.log("##", activity);
    const url = `${API_URL}activity/${activity.id}`

    fetch(url, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activity)
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ 
          activityInfo: data,
          activityForm: false 
        })
      })
      .catch(error => {
        console.log("update activity info error :", error);
      })
  }


  createNewActivity(activity) {
    const url = `${API_URL}activity`
console.log("create new activity info",activity)
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activity)
    })
      .then(response => response.json())
      .then(data => {
        console.log("create new activity data",data)

        this.setState({ 
          activityInfo: data,
          activityForm: false
         })
      })
      .catch(error => {
        console.log('create Newa ctivity Error: ', error)
      })
  }
  
  
  render() {
    return (
      <div>

        <Nav
          onNavClick={this.onNavClick}
          active={this.state.activeNav}
          navs={["Home", "About", "Activity", "Login"]}
          navsRef={["Home", "About", "Activity", "Login" ]}
        />

      <About/>

      {this.renderLoginForm()}

      <UserForm userInfo={this.state.userInfo} 
                     handleFormSubmit={this.handleFormSubmit.bind(this)} 
                     handleRegister={this.handleRegister.bind(this)} 
                     />
                     <Activity handleFormActivity={this.handleFormActivity.bind(this)}
                     />
                   

      </div>
    );
  }
}

export default App;
