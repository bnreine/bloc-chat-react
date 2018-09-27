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
    //console.log(this.props.activeRoomRef.key)
    this.messagesRef.orderByChild("sentAt").on("child_added", snapshot => {
      const message = snapshot.val();
      this.setState(state => ({ messages: this.state.messages.concat(message) }));
      }
    );

  }



  /*
  componentDidUpdate(prevProps, prevState, snapshot) {

    if ((this.state.messages.length === 0) && (this.props.activeRoomRef !== prevProps.activeRoomRef)) {
      this.updateMessages();
    }

    if ((prevProps.activeRoomRef !== this.props.activeRoomRef) && (this.state.messages.length !== 0) ) {
      console.log("zeroing")
      this.zero();
    }

  }
  */



  /*
  zero () {
    this.setState({messages: []});
  }
  */





  /*
  updateMessages() {
    //console.log("Hello")


    this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoomRef.key).on("child_added", snapshot => {
      const message = snapshot.val();
      console.log(message);
      console.log(this.props.activeRoomRef.key);
      this.setState(state => ({ messages: this.state.messages.concat(message) }));
      }
    );

  }
  */


  roomTitle() {

    /*
    this.messagesRef.once("value", snapshot => {
      console.log(snapshot.child('message1').val().content)
    })
    */

    //console.log(this.props.activeRoomRef.key)

    if (this.props.activeRoomRef.key !== "Default") {
      //var roomTitle = '';  //can't do it this way because this variable is mutable
      this.props.firebase.database().ref('rooms').once("value", snapshot => {
        const roomTitleTest = snapshot.child(this.props.activeRoomRef.key).val().name;
        //this.setState({activeRoomTitle: roomTitleTest});
        console.log(roomTitleTest);
        //return roomTitleTest
        //const title = function(){return roomTitle};
      })
      //return this.state.activeRoomTitle

    }

    /*
    if (this.props.activeRoomRef.key !== "Default") {
      this.props.activeRoomRef.once("value", snapshot => {
          console.log(snapshot.val())
          snapshot.forEach( child => {
            console.log(child.key+": "+child.val());
        })
      })
    }
    */

  }




      /*
      var rootRef = firebase.database.ref();
      var urlRef = rootRef.child("user1/DAA Notes/URL");
      urlRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.key+": "+child.val());
        });
      });
      */




          /*
          console.log(this.props.activeRoomRef.key)  //gives key of 1 for room 1
          console.log(snapshot) //gives snapshot of active room with key of 1 for room 1
          console.log(snapshot.child('1/name').key) //gives name for active room of 1 for room 1
          console.log(snapshot.child('1/name/room1').key) //
          */


          //const activeRoom = snapshot.child('name').val();
          //console.log(activeRoom)



    ///Need to trace through the children and spit out the value of the name
    //return (this.props.firebase.database().ref('rooms').child(this.props.activeRoomRef.key).child('name').val  )
    //console.log(this.roomsRef.child('-LN6wyCdE0u5fZS9mGxn').child('name').key   )




  render() {


    return(
      <div>
        <div>
          Title: {this.roomTitle()}
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
