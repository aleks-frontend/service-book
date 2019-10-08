import React, { Fragment } from 'react';
import './App.css';
import Header from './components/Header';
import Logo from './components/Logo';
import Nav from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="side">
          <Logo />
          <Nav marginTop={1.5} />
        </div>
        <div className="main">
          <Header />
          <div className="body">

          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
