import React, { Component } from 'react';

class Activity extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: props.activityInfo ? props.activityInfo.title : '',
      description: props.activityInfo ? props.activityInfo.description : '',
      time: props.activityInfo ? props.activityInfo.time : '',
      location: props.activityInfo ? props.activityInfo.location : '',
      date: props.activityInfo ? props.activityInfo.date : '',
      image: props.activityInfo ? props.activityInfo.image : '',
      user_id: props.userInfo ? props.userInfo.id : '',
      id: props.activityInfo ? props.activityInfo.id : null
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
    this.props.handleFormActivity(this.state)
  }

  render() {
    return (
      <div className="activity">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label for="exampleFormControlInput1">title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" value={this.state.title} name="title" onChange={this.handleChange.bind(this)} />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputEmail4">time</label>
              <input type="time" class="form-control" id="inputTime" placeholder="" value={this.state.time} name="time" onChange={this.handleChange.bind(this)} />
            </div>
            <div className="form-group col-md-6">
              <label for="inputEmail4">location</label>
              <input type="text" class="form-control" id="location" placeholder="Jeddah" value={this.state.location} name="location" onChange={this.handleChange.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <label for="exampleFormControlSelect2">To do list</label>
            <select multiple className="form-control" id="exampleFormControlSelect2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.description} name="description" onChange={this.handleChange.bind(this)}  ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>

    )
  }
}

export default Activity;

