import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      messages:[],
      activeRoomTitle: ''
    };
    this.messagesRef=this.props.firebase.database().ref('messages');
  }


  componentDidMount() {
    this.messagesRef.orderByChild("sentAt").on("child_added", snapshot => {
      const message = snapshot.val();
      this.setState(state => ({ messages: this.state.messages.concat(message) }));
      }
    );
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((this.props.activeRoomRef.key !== "Default") && (this.props.activeRoomRef.key !== prevProps.activeRoomRef.key)) {
      this.props.firebase.database().ref('rooms').once("value", snapshot => {
        const roomTitleTest = snapshot.child(this.props.activeRoomRef.key).val().name;
        this.setState({activeRoomTitle: roomTitleTest});
      })
    }
  }


  roomTitle() {
    const roomTitleValue = this.state.activeRoomTitle !== '' ? this.state.activeRoomTitle : '';
    const titleValue = this.state.activeRoomTitle !== '' ? 'Title: ' : '';
    return (titleValue + roomTitleValue)
  }


  render() {


    return(
      <div>
        <div>
          {this.roomTitle()}
        </div>

        <div>
          {this.state.messages.filter( message => message.roomId === this.props.activeRoomRef.key).map( (messageEntry, index) =>
            <div key={index}>{messageEntry.content}</div> )}
        </div>
      </div>
    )
  }
}


export default MessageList;
