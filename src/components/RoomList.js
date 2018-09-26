import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      nextRoom:''
    };
    this.roomsRef=this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState(state => ({ rooms: this.state.rooms.concat( room ) }))
    });
  }

  handleTextChange(e) {
    this.setState({ nextRoom: e.target.value })
  }


  createRoom(e) {
    e.preventDefault();
    if (!this.state.nextRoom) { return }
    const nextRoomEntry = this.state.nextRoom;
    this.setState(state => ({ rooms: [...this.state.rooms, nextRoomEntry], nextRoom: '' }));
    this.roomsRef.push({
      'name': nextRoomEntry
    });
  }



  //handles click event on room list item
  //results:
  //  1. Turns clicked item blue
  //  2. Calls handleRoomChange callback from props (via app component)
  handleClick(e, activeKey) {
    e.preventDefault();
    if (activeKey === this.props.activeRoomRef.key) {
      return;
    } else {
      this.props.handleRoomChange(activeKey); 
    }
  }

  //toggles color to blue on clicking on room.  Otherwise, black
  activeColor (room) {
    if (this.props.activeRoomRef.key===room.key) {
      return {color: 'blue'}
    }
    return {color: 'black'}
  }



  render() {
    return(
      <div>
        {this.state.rooms.map( (room, index) =>
          <div style={this.activeColor(room)} key={this.state.rooms[index].key} onClick={ (e) => this.handleClick(e, this.state.rooms[index].key) } >
            {room.name} key: {this.state.rooms[index].key}
          </div>
          )
        }



        <form onSubmit={(e) => this.createRoom(e)} >
          <div>
            <label htmlFor="name">Enter new chat room name: </label>
            <input type="text" name="name" value={ this.state.nextRoom } onChange={ (e) => this.handleTextChange(e)} />
          </div>
          <div>
            <input type="submit"/>
          </div>
        </form>



      </div>
    )
  }

}

export default RoomList;
