import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat React</h1>
        </header>
        <p className="App-intro">

        </p>
        <RoomList firebase={firebase} test={2+1} />
      </div>
    );
  }
}

export default App;
