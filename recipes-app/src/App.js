import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    isLoading: true,
    recipes: []
  };

  render() {
    return (
      <div className="App">
         <header>
          <h1>Recipe Management</h1>
        </header>
        <div className="App-intro">
          <h2>Welcome to Recipe App!</h2>
        </div>
      </div>
    );
  }
}

export default App;