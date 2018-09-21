import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      messageList:
        [
        {words: 'hi',
        userName: 'Bernie'
        },
        {words: 'there',
        userName: 'Sanders'}
        ]
    }
    this.roomsRef=this.props.firebase.database().ref('rooms');
  }






  render() {
    return(
      <div>
        {this.state.messageList.map( (message, index) => <div key={index}>{message.userName}</div> )}
      </div>
    )
  }
}


export default MessageList;
