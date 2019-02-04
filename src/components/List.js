import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: props.listInfo ? props.listInfo.title : '',
      note: props.listInfo ? props.listInfo.description : '',
      user_id: props.userInfo ? props.userInfo.id : '',
      activity_id: props.clickedActivity ? props.clickedActivity : '',
      id: props.listInfo ? props.listInfo.id : null,
    }
  }

  handleChange(event) {
    const currentInput = event.target.name;
    const newValue = event.target.value;

    this.setState({
      [currentInput]: newValue
    })
  }

  //Handle delete and edit list
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleFormlist(this.state);
  }

  componentDidMount() {
    console.log(`I'm inside the list component and this is for activity id ${this.props.clickedActivity}  and user id ${this.props.userInfo.id}`)
  }

  render() {
    console.log(this.props);
    return (

      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name your list" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="note" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    )
  }
}

export default List;

