import React from 'react';
import './App.css';
import Nav from './components/UI/Nav';
import Main from './components/Main';
import Side from './components/UI/Side';
import { AppProvider } from './AppContext';

class App extends React.Component {
  state = {
    loaded: false,
    ssot: {
      services: {},
      actions: {},
      devices: {},
      customers: {}
    },
    filteredServicesArray: []
  }

  render() {
    return (
      <AppProvider>
        <React.Fragment>
          <Side>
            <Nav margin="2rem 0 0"
              activeNavItemKey={this.state.activeNavItemKey}
              setNavActive={this.setNavActive}
              setFilteredServicesArray={this.setFilteredServicesArray}
            />
          </Side>
          <Main />
        </React.Fragment>
      </AppProvider>
    );
  }
}

export default App;
