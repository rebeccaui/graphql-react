import React, { PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';

const App = props => (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to LexiComm</h2>
        <h3>A community of writers, poets, and musicians</h3>
      </header>
      <section className="App-body">
        {props.children}
      </section>
    </div>
);

App.propTypes = {  
  children: PropTypes.node,
}

export default App;