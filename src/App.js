import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';


var config = {
  apiKey: "AIzaSyChxXvaAJjCj8nM-Q4q7qK8xQxnYwVLeNc",
  authDomain: "bloc-chat-react-e1c2c.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-e1c2c.firebaseio.com",
  projectId: "bloc-chat-react-e1c2c",
  storageBucket: "bloc-chat-react-e1c2c.appspot.com",
  messagingSenderId: "922282830626"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoomRef: {Ref: "Default", key: "Default Key"},
      prevRoomRef: {}
    }
    //this.handleRoomChange=this.handleRoomChange.bind(this);
  }

  handleRoomChange(activeKey){
    const newActiveRoomRef = firebase.database().ref(activeKey);
    this.setState( state => ({ activeRoomRef: newActiveRoomRef, prevRoomRef: this.state.activeRoomRef }));
    console.log(this.state.activeRoomRef.key); //this is one step behind because setState doesn't happen until after this function block
    console.log(this.state.prevRoomRef.key); //also one step behind
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat React</h1>
        </header>
        <p className="App-intro">

        </p>

        <main>
          <MessageList firebase={firebase} activeRoomRef={this.state.activeRoomRef} />
        </main>

        <aside>
          <br/>
          <RoomList firebase={firebase} activeRoomRef={this.state.activeRoomRef} prevRoomRef={this.state.prevRoomRef} handleRoomChange={(aKey) => this.handleRoomChange(aKey)} />
        </aside>
      </div>
    );
  }
}

export default App;
