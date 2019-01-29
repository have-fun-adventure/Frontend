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
      location: props.userInfo ? props.userInfo.location: '',
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
  // <div className="user-form">
  //       <form className="show-form" onSubmit={this.handleSubmit.bind(this)}>
  //         <div className="close-modal" onClick={() => this.props.handleRegister()}>x</div>
  //         <label>username:</label><input type="text" value={this.state.username} name="username" onChange={this.handleChange.bind(this)} /><br />
  //         <label>firstname:</label><input type="text" value={this.state.firstname} name="firstname" onChange={this.handleChange.bind(this)} /><br />
  //         <label>lastname:</label><input type="text" value={this.state.lastname} name="lastname" onChange={this.handleChange.bind(this)} /><br />
  //         <label>email:</label><input type="text" value={this.state.email} name="email" onChange={this.handleChange.bind(this)} /><br />
  //         <label>phone:</label><input type="text" value={this.state.phone} name="phone" onChange={this.handleChange.bind(this)} /><br />
  //         <button>submit</button>
  //       </form>
  //     </div>
  render()
   {
    return( 
    <div className="form">
<form>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
       </div>
      <div className="form-group col-md-6">
        <label for="inputPassword4">Password</label>
        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
       </div>
      </div>
      <div className="form-group">
        <label for="inputAddress">Address</label>
        <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
       </div>
        <div className="form-group">
          <label for="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
         </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity"/>
            </div>
              <div className="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" className="form-control">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label for="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip"/>
               </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck"/>
                    <label className="form-check-label" for="gridCheck">
                      Check me out
                      </label>
                     </div>
                      </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
</form>

    </div>
                    
                 )
                }
                }
                
export default UserForm;

