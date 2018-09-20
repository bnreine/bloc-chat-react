import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      
    }
    this.roomsRef=this.props.firebase.database().ref('rooms');
  }



  render() {
    return(
      <div>I am a message list</div>
    )
  }
}


export default MessageList;
