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

  handleChange = (event) => {

    console.log("handel handleChange \n\n\n\n\n\n ", this.state.name, this.state.note)
    const currentInput = event.target.name;
    const newValue = event.target.value;

    this.setState({
      [currentInput]: newValue
    })
  }

  //Handle delete and edit list
  handleSubmit = (event) => {

    console.log("handel submit \n\n\n\n\n\n ")
    event.preventDefault();
    this.props.handleFormlist({ name: this.state.name, note: this.state.note, activity_id: this.state.activity_id  , user_id: this.state.user_id });
  }

  componentDidMount() {
    console.log(`I'm inside the list component and this is for activity id ${this.props.clickedActivity}  and user id ${this.props.userInfo.id}`)
  }

  render() {
    console.log(this.props);
    return (

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name your list" name="name" value={this.state.name} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="note" name="note" value={this.state.note} onChange={this.handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    )
  }
}

export default List;

