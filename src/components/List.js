import React, { Component } from 'react';

class List extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      name: props.listInfo ? props.listInfo.title : '',
      note: props.listInfo ? props.listInfo.description : '',
      user_id: props.userInfo ? props.userInfo.id : '',
      activity_id:props.activitInfo ? props.activitInfo.id : '',
      id: props.listInfo ? props.listInfo.id : null
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
    this.props.handleFormList(this.state)
  }

  render() {
    return (
      <div className="list">
<form onSubmit={this.handleSubmit.bind(this)}>
  <div className="form-row">
    <div className="col">
      <input type="text" className="form-control" placeholder="Name your list" value={this.state.name} name="name"/>
    </div>
    <div className="col">
      <input type="text" className="form-control" placeholder="make a spichal note" value={this.state.note} name="note"/>
    </div>
  </div>
  <button>submit</button>
</form>
      </div>

    )
  }
}

export default List;

