import React, { Component, Fragment } from 'react';
import Header from './Header';
import Logo from './Logo';
import Nav from './Nav';

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
            <div className="side">
              <Logo />
              <Nav margin="2rem 0 0" history={this.props.history} />
            </div>
            <div className="main">
              <Header />
              <div className="body">
                Dashboard
              </div>
            </div>
          </Fragment>
        );
    }
}

export default Dashboard;