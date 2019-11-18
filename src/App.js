import React from 'react';
import './App.css';
import Logo from './components/UI/Logo';
import Nav from './components/UI/Nav';
import Main from './components/Main';
import Side from './components/UI/Side';
import LoadingSpinner from './components/UI/LoadingSpinner';
import base from './base';

class App extends React.Component {
  state = {
    activeNavItemKey: "history",
    loaded: false,
    ssot: {
      services: {},
      actions: {},
      devices: {},
      customers: {}
    }
  }

  componentDidMount() {
    this.ref = base.syncState('ssot', {
      context: this,
      state: 'ssot'
    });
  }
  
  componentDidUpdate() {
    if ( !this.state.loaded ) {
      this.setState({loaded: true});
    }
  }

  addService = (service) => {
    const services = {...this.state.ssot.services, [new Date().getTime()]: service};
    console.log(services);
    this.setState({ ssot: {...this.state.ssot, services: services} });    
  }

  updateService = (service, id) => {
    const services = {...this.state.ssot.services};
    services[id] = service;
    this.setState({ ssot: {...this.state.ssot, services: services} });
  }

  deleteService = (id) => {
    const services = {...this.state.ssot.services};
    services[id] = null;
    this.setState({ ssot: {...this.state.ssot, ['services']: services} });
  }  

  addEntity = (entity, id, key) => {
    const entityState = {...this.state[key], [id]: entity};
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }
  
  deleteEntity = (id, key) => {
    const entityState = {...this.state[key]};
    entityState[id] = null;
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }

  updateEntity = (entity, id, key) => {
    const entityState = {...this.state[key], [id]: entity};
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }

  filterServices = (service, searchText) => {
    if ( searchText === '' ) return true;
    for ( const serviceKey of Object.keys(service) ) {
      let serviceProp;
      if ( serviceKey === 'actions' ) {
        if ( service[serviceKey] === '' ) {
          serviceProp = ''
        } else {
          serviceProp = service[serviceKey].map(actionItem => actionItem.actionId);
        }
      } else {
        serviceProp = service[serviceKey];
      }

      if ( typeof serviceProp === 'boolean' || typeof serviceProp === 'number' ) continue;
      if ( !Array.isArray(serviceProp)  ) {
        if ( serviceProp.toLowerCase().includes(searchText.toLowerCase()) ) {
          return true;
        }
      } else {
        for ( const servicePropKey of serviceProp ) {
          const relatedObj = this.state.ssot[serviceKey][servicePropKey];
          for ( const relatedObjKey of Object.keys(relatedObj) ) {
            if ( String(relatedObj[relatedObjKey]).toLowerCase().includes(searchText.toLowerCase()) ) {
              return true;
            }
          }
        }
      }
    }

    return false;
  }  

  sortServices = (arr, criteria, asc=true) => {

    return arr.sort((a, b) => {
      let itemA; 
      let itemB; 
      const propValueA = this.state.ssot.services[a][criteria];
      const propValueB = this.state.ssot.services[b][criteria];
      
      if ( Array.isArray(propValueA) ) {
        itemA = propValueA.length ? this.state.ssot[criteria][propValueA[0]] : '';
        itemB = propValueB.length ? this.state.ssot[criteria][propValueB[0]] : '';

        itemA = itemA.name || '';
        itemB = itemB.name || '';
        
      } else if ( typeof propValueA === 'string'  ) {
        itemA = propValueA.toLowerCase();
        itemB = propValueB.toLowerCase();
      } else { // Situation when we are sorting by date - so the type will be number
        // Needed to invert values here
        [itemA, itemB] = [propValueB, propValueA];
      }

      if ( itemA < itemB ) {
        return asc ? -1 : 1;
      }

      if ( itemA > itemB ) {
        return asc ? 1 : -1;
      }

      return 0;
    });
  }

  findServiceByEntityId = (id, entityType) => {
    if ( entityType === 'actions' ) {
      return Object.keys(this.state.ssot.services).find(key => {
        // Checking if actions is an empty string or undefined
        if ( !this.state.ssot.services[key][entityType] ) return false;
        
        return this.state.ssot.services[key][entityType].find(actionItem => {          
          if ( actionItem.actionId === id ) {
            return true;
          }
        });
      });        
    } else {
      return Object.keys(this.state.ssot.services).find(key => {
        return this.state.ssot.services[key][entityType].indexOf(id) > -1;
      });
    }
    
  }
  
  getCustomerNameById = id => this.state.ssot.customers[id].name;

  getDeviceById = id => {
    return `${this.state.ssot.devices[id].manufacturer} ${this.state.ssot.devices[id].model}`;
  }

  getActionNameById = id => this.state.ssot.actions[id].name;

  setNavActive = key => {    
    this.setState({ activeNavItemKey: key });
  }

  renderLoadingSpinner = () => {
    if ( !this.state.loaded ) {
      return <LoadingSpinner />
    }
  }

  render() {
    return (
      <React.Fragment>
        <Side>
          <Logo />
          <Nav margin="2rem 0 0" 
            activeNavItemKey={this.state.activeNavItemKey} 
            setNavActive={this.setNavActive} 
          />
        </Side>       
        <Main
          activeNavItemKey={this.state.activeNavItemKey} 
          services={this.state.ssot.services}
          customers={this.state.ssot.customers}
          actions={this.state.ssot.actions}
          devices={this.state.ssot.devices}
          getCustomerNameById={this.getCustomerNameById} 
          getDeviceById={this.getDeviceById}   
          getActionNameById={this.getActionNameById}  
          filterServices={this.filterServices}      
          sortServices={this.sortServices}     
          addService={this.addService} 
          updateService={this.updateService}
          deleteService={this.deleteService}
          addEntity={this.addEntity} 
          deleteEntity={this.deleteEntity} 
          updateEntity={this.updateEntity} 
          findServiceByEntityId={this.findServiceByEntityId}
          renderLoadingSpinner={this.renderLoadingSpinner}
        />
      </React.Fragment>
    );
  }
}

export default App;
