import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      messages:[],
    };
    this.messagesRef=this.props.firebase.database().ref('messages');
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.activeRoomRef !== this.props.activeRoomRef) && (this.state.messages.length !== 0)) {
      console.log("zeroing")
      this.zero();
    }

    if ((this.state.messages.length === 0) && (this.props.activeRoomRef !== prevProps.activeRoomRef)) {
      this.updateMessages();
    }

  }


  zero () {
    this.setState({messages: []});
  }


  updateMessages() {
    this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoomRef.key).on("child_added", snapshot => {
      const message = snapshot.val();
      this.setState(state => ({ messages: this.state.messages.concat(message) }));
      }
    );
  }




  render() {


    return(
      <div>
        {this.state.messages.map( (message, index) => <div key={index}>{message.content}</div> )}
      </div>
    )
  }
}


export default MessageList;
