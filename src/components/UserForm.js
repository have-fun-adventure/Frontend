import React, { Component } from 'react';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.userInfo ? props.userInfo.username : '',
      firstname: props.userInfo ? props.userInfo.firstname : '',
      lastname: props.userInfo ? props.userInfo.lastname : '',
      email: props.userInfo ? props.userInfo.email : '',
      password: props.userInfo ? props.userInfo.password : '',
      phone: props.userInfo ? props.userInfo.phone : '',
      gender: props.userInfo ? props.userInfo.gender : '',
      location: props.userInfo ? props.userInfo.location : '',
      id: props.userInfo ? props.userInfo.id : null
    }
  }

  handleChange(event) {
    const currentInput = event.target.name;
    const newValue = event.target.value;

    this.setState({
      [currentInput]: newValue
    })
  }

  //Handle Register and edit submission
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleFormSubmit(this.state)
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input type="email" class="form-control" id="inputEmail4" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">Username</label>
              <input type="text" class="form-control" id="username" placeholder="username" value={this.state.username} name="username" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">Phone</label>
              <input type="text" class="form-control" id="phone" placeholder="966 55555 5555" value={this.state.phone} name="phone" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input type="password" className="form-control" id="inputPassword4" placeholder="Password" value={this.state.password} name="password"  onChange={this.handleChange.bind(this)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="firstname">First Name</label>
              <input type="text" class="form-control" id="firstname" value={this.state.firstname} name="firstname" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-6">
              <label for="lastname">Last Name</label>
              <input type="text" class="form-control" id="lastname" value={this.state.lastname} name="lastname" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-4">
              <label for="gender">Gender</label>
              <select id="gender" className="form-control">
                <option selected>Choose...</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label for="location">Location</label>
              <input type="text" className="form-control" id="location" value={this.state.location} name="location" onChange={this.handleChange.bind(this)}/>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>

    )
  }
}

export default UserForm;

