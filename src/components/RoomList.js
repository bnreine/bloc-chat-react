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
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleChange(e) {
    this.setState({ nextRoom: e.target.value })
  }


  createRoom(e) {
    e.preventDefault();
    if (!this.state.nextRoom) { return }
    const nextRoomEntry = this.state.nextRoom;
    this.setState({ rooms: [...this.state.rooms, nextRoomEntry], nextRoom: '' });
    this.roomsRef.push({
      'name': nextRoomEntry
    });
  }


  render() {
    return(
      <div>
        {this.state.rooms.map( (room, index) => <div key={index}>{room.name}</div> )}

        <form onSubmit={(e) => this.createRoom(e)} >
          <div>
            <label htmlFor="name">Enter new chat room name: </label>
            <input type="text" name="name" value={ this.state.nextRoom } onChange={ (e) => this.handleChange(e)} />
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
