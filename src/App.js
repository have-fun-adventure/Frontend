import React, { Component } from "react";
import "./App.css";
import Nav from "./components/Nav";
import About from "./components/About";
import UserForm from "./components/UserForm"
import Activity from "./components/Activity";
import Profile from "./components/Profile"
import List from "./components/List"
import { getUser, setJwt } from "./services/auth"
import swal from 'sweetalert';
import AuthForm from "./components/AuthForm";



const API_URL = 'http://localhost:3000/';

class App extends Component {
  constructor() {
    super();
    this.state = {

      navs: ["Home", "About", "Activity", "Signup"],
      activeNav: "home",
      activePage: "home",
      clickedActivity: [],
      user: null,
      userInfo: null,
      activityInfo: '',
      listInfo: undefined,
      username: '',
      activity: [],
      usersActivity: [],
      list: undefined,
      activityForm: false,
      listForm: false,
      showProfile: false,
    };
  }





  /*************** NAV *********************/
  onNavClick = activeNav => {
    console.log("activeNav toggle", activeNav)

    this.changeActivePage(activeNav)
    this.setState({ activeNav });
  };


  /********************User*********************/

  // create user information in the database 
  createNewUser(user) {
    const url = `${API_URL}user`
    // console.log("create user info", user)
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        // console.log("create user info  data", data)

        this.setState({
          userInfo: data,
          userForm: false
        })
      })
      .catch(error => {
        // console.log('create New User Error: ', error)
        swal("Oops", "Tnis username or email is Registerd", "error")
      })
  }

  //check user auth
  checkForUser() {
    const user = getUser();
    if (user) {
      this.setState({ user });
    }
  }


  // show the login form 
  setLoginForm() {
    this.setState({
      loginForm: !this.state.loginForm,
      userForm: false,
      activityForm: true
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

    console.log("Button clicked")
    // fetch(`${API_URL}user/${this.state.username}`)
    fetch(`${API_URL}user/auth`)
      .then(response => response.json())
      .then(data => {

        setJwt(data.token)
        this.setState({
          userInfo: getUser(),
          loginForm: false,
          activityForm: true
        })
        // console.log("data", data)

      })
      .catch(error => {
        // console.log('error in submit user: ', error);
        swal("Oops", "This username NOT Registered", "error")
      })
    // console.log("this.state.userInfo:", this.state.userInfo);
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

  // users  join  activity 
  createUserActivity(act) {
    console.log('POSTING IN createUserActivity ', act)
    const url = `${API_URL}activity/activity`
    // console.log("create user activity info", actI)
    // console.log("user inf from s", usI)
    const data = {
      activity_id: act,
      user_id: getUser().id
    }
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log("create user activity  data", data)

        this.setState({
          usersActivity: this.state.usersActivity.concat([data]),
          activityForm: true
        })
      })
      .catch(error => {
        // console.log('create New User activity Error: ', error)
        swal("Oops", "You have to be login", "error")
      })
  }


  //fetch all users in activity
  fetchUsersActivity(id) {
    // console.log("usersActivity!!!!", this.state.usersActivity)
    // console.log('activity.id at activity', id);

    console.log(`${API_URL}activity/activity/${id}`);
    fetch(`${API_URL}activity/activity/${id}`)
      .then((res) => { return res.json() })
      .then((data) => {
        // console.log("get all users data in this activity", data)
        this.setState({ usersActivity: data });
        // console.log("fetch all users by activity  \n\n ", this.state.usersActivity)

      })

  }
  renderUsersActivity() {
    // console.log(" render usersActivity", this.state.usersActivity)
    return this.state.usersActivity.map((elm) => {
      return (
        <div>

          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">  {elm.username} </h5>

            </div>
          </div>



        </div>)
    })
  }


  //handel new user 
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
  renderUserProfile() {
    return <Profile user={this.state.userInfo}
      handleRegister={this.handleRegister.bind(this)}
      setUserProfile={this.setUserProfile.bind(this)}
    />
  }



  /********************Activity*********************/



  renderActivityForm() {
    // console.log("i am in render activity form");
    console.log(this.state.activityForm);
    if (this.state.activityForm === true) {
      return (
        <Activity handleFormActivity={this.handleFormActivity.bind(this)}
          userInfo={this.state.userInfo} />
      )
    }
  }
  //handel activity submit
  handleActivitySubmit(event) {
    event.preventDefault();

    fetch(`${API_URL}activity/${this.state.id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          activityInfo: data,
          activityForm: true,
          listForm: true,

        })
      })
      .catch(error => {
        // console.log('App.js handleSubmit function: ', error);

      })
    console.log(this.state.activityInfo);
  }


  //handel update and create activity
  handleFormActivity(activity) {
    this.state.activityInfo ? this.updateActivityInfo(activity) : this.createNewActivity(activity)
  }


  // update activity information in the database 
  updateActivityInfo(activity) {
    // console.log("update activity info", activity);
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
          activityForm: true
        })
      })
      .catch(error => {
        // console.log("update activity info error :", error);
      })
  }


  createNewActivity(activity) {
    const url = `${API_URL}activity`
    // console.log("create new activity info", activity)

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activity)
    })
      .then(response => response.json())
      .then(data => {
        // console.log("create new activity data", data)

        this.setState({
          activityInfo: data,
          activityForm: true
        })
      })
      .catch(error => {
        // console.log('create New activity Error: ', error)
      })
  }


  // fetch all activity
  componentDidMount() {

    this.checkForUser();

    if (this.state.user) {
      this.setState({ navs: this.state.navs.concat(["sigin out"]) })
    } else {
      this.setState({ navs: this.state.navs.concat(["login"]) })
    }
    // console.log(this.state.navs)

    fetch(`${API_URL}activity`)
      .then((res) => { return res.json() })
      .then((data) => {
        // console.log("get all act/ivity data", data)
        this.setState({ activity: data });
      })
  }


  //change activity by clicked 
  changeCurrentActivity = (act) => {
    console.log("act", act)
    this.setState({
      clickedActivity: act.id
    })
  }
  // render all activity
  renderActivity(active) {
    return active.map((act) => {
      return (
        <div>
          <br />

          <div className="card text-center activity">
            <div className="card-header">
              {act.title}
            </div>
            <div className="card-body">
              <h5 className="card-title">{act.location}</h5>
              <h6 className="card-title">{act.date}</h6>
              <p className="card-text">{act.description}</p>
              <a onClick={() => {
                this.changeActivePage("listForm");
                this.changeCurrentActivity(act);
                this.fetchlist(act.id);
                this.fetchUsersActivity(act.id);
                // this.setState({
                //   userInfo: getUser()
                // })
                this.createUserActivity(act.id);
              }}
                className="btn btn-primary">Let's #have_fun  <span> 🌟 </span></a>
            </div>
          </div>
        </div>
      )
    })
  }




  /********************Login*********************/


  login = () => {


    // console.log("getting the user")
    const userInfo = getUser();
    this.setState({ userInfo });

    this.setState({ activePage: "home" })
  };


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
      <div className="login p-5">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="close-modal" onClick={() => this.setLoginForm()}>x</div>

          <div className="row">
            <div className="col-sm">
              <label className="sr-only" for="inlineFormInputGroup">Username</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                </div>
                <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Username" onChange={this.handleChange.bind(this)} />
              </div>
            </div>


            <div className="col-sm">
              <label className="sr-only" for="inlineFormInputGroup">password</label>
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">*</div>
                </div>
                <input type="text" className="form-control" id="pass" placeholder="password" onChange={this.handleChange.bind(this)} />
              </div>
            </div>

            <div className="col-sm">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>

    )
  }


  /********************List*********************/

  renderListForm() {
    return (
      <div>
        <List
          handleFormlist={this.handleFormlist}
          userInfo={this.state.userInfo}
          activityInfo={this.state.activityInfo}
          clickedActivity={this.state.clickedActivity}

        />

      </div>
    )
  }
  changeActivePage = (activePage) => {
    this.setState({ activePage })
  }

  //create new list
  createNewlist(list) {
    const url = `${API_URL}list`
    // console.log("create new list info", list)

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(list)
    })
      .then(response => response.json())
      .then(data => {
        // console.log("create new list data", data)

        this.setState({
          listInfo: data,
          listForm: true
        })
      })
      .catch(error => {
        // console.log('create New list Error: ', error)
        swal("Oops", "You should be login", "error")

      })
  }

  //delete list  
  deleteList(list) {
    // console.log("list in dele list ", list)
    const url = `${API_URL}list/${list}`
    console.log(list)

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const list = this.state.listInfo.filter(li => li.id !== list)
        this.setState({
          list: list,
          listForm: null
        })
      })
      .catch(error => {
        // console.log("error from DEL list", error);
      })
  }


  //handel delete and create list
  handleFormlist = (list) => {

    (this.state.listInfo) ? this.deleteList(list) : this.createNewlist(list)
    console.log(list);
  }

  // fetch all list by activity 
  fetchlist(id) {
    // console.log('idddddd', id);
    console.log(`${API_URL}list/activity/${id}`);
    fetch(`${API_URL}list/activity/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("get all list data in this activity", data)
        this.setState({ list: data });


        // console.log("fetch all list by activity  \n\n ", this.state.list)

      })

  }

  // render all list in spiesifiech activity
  renderListInActivity() {

    // console.log("i'm in the render list activity");
    return this.state.list.map((li) => {
      // cuz the result come as array of array 
      return li.map((elm) => {
        return (
          <div className="list">
            <br />
            <div className="row">
              <div className="col-sm-4">
                <div className="card text-center">
                  <div className="card-header">
                    {elm.name}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{elm.note}</h5>
                    <a onClick={() => this.deleteList(elm.id)} className="btn btn-primary">DELETE<span> ❌ </span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })
    })

  }


  /******************** App Render *********************/

  render() {
    return (
      <div>

        <Nav
          onNavClick={this.onNavClick}
          active={this.state.activeNav}
          navs={this.state.navs}

        />

        <div style={{ padding: " 200px 0 0 0" }}>

          {this.state.activePage === "about" ? <About /> : ""}

          {this.state.activePage === "home" ? (
            <div> <About />  {this.renderActivity(this.state.activity)} {this.renderActivityForm()} </div>) : ""}

          {this.state.activePage === "login" ? (
            <AuthForm userInfo={this.state.userInfo} form="login" onLogin={this.login} />
          ) : ""}

          {this.state.activePage === "signup" ? (<AuthForm userInfo={this.state.userInfo} form="signup" onLogin={this.login} />) : ""}

          {/* <UserForm userInfo={this.state.userInfo}
                handleFormSubmit={this.handleFormSubmit.bind(this)}
                handleRegister={this.handleRegister.bind(this)} /> </div>) : ""} */}


          {this.state.activePage === "activity" ? (
            <div>  {this.renderActivity(this.state.activity)} {this.renderActivityForm()}

              <span className="glyphicon glyphicon-plus-sign"></span><br />

            </div>) : ""}


          {this.state.activePage === "listForm" ? this.renderListForm() : ""}
          {this.state.activePage === "listForm" && this.state.list ? (this.renderListInActivity()) : ""}
          {this.state.activePage === "listForm" ? this.renderUsersActivity() : ""}



        </div>

      </div>

    );
  }
}

export default App;
