import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state={
      messages:[],
    };
    //console.log(this.props.activeRoom);
    //this.activeRoom=this.props.activeRoom;
    //console.log(this.activeRoom);  //room4

    //this.activeRoomRef=this.props.firebase.database().ref(this.activeRoom); //activeRoom = room4
    //console.log(this.activeRoomRef); // ref for room4
    //console.log(this.activeRoomRef.key); // room4

    //drill down successful
    //this.roomsRef=this.props.firebase.database().ref('rooms');
    //console.log(this.roomsRef.key); //rooms
    //console.log(this.roomsRef.child('-LN6wyCdE0u5fZS9mGxn').child('name').key   ); //-LN6wyCdE0u5fZS9mGxn

    //console.log(this.roomsRef.orderByChild('name'));
    //this.activeRoomIdRef=this.roomsRef.orderByChild('name');
    //console.log(this.activeRoomIdRef);

    //console.log(this.activeRoomId);
    this.messagesRef=this.props.firebase.database().ref('messages');
    //console.log(this.messagesRef.key);
    //console.log(this.messagesRef.orderByChild('sentAt').equalTo('01:28'));

  }




  componentDidMount() {


    //this.roomsRef.orderByChild('name').equalTo(this.activeRoom).on("child_added", snapshot => {
    //  this.activeRoomId=snapshot.key;
      //console.log(this.activeRoomId);
    //});



    this.messagesRef.orderByChild("roomId").equalTo('1').on("child_added", snapshot => {
      const message = snapshot.val();
      this.setState({ messages: this.state.messages.concat(message) });
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
