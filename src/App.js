import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Nav from './components/Nav';
import Main from './components/Main';
import Side from './components/Side';
import base from './base';

class App extends React.Component {
  state = {
    activeNavItemKey: "newService",
    ssot : {
      services: {
        service1: {
          title: "Service item 1",
          description: "some description",
          date: "11/09/19",
          remark: "some remark for service 1",
          status: "completed",
          actions: ["action1"],
          devices: ["device1"],
          customers: ["customer1"],
        }
      },
      actions: {
        action1: {
          name: "Windows intallation",
          price: 1500
        }
      },
      devices: {
        device1: {
          manufacturer: "HP",
          model: "Home Server",
          name: "HP Home Server",
          serial: "12345",
          title: ""
        }
      },
      customers: {
        customer1: {
          name: "Aleksandar Gojkovic",
          phone: "064/109-61-57",
          email: "aleksfrontend@gmail.com",
          facebook: "/",
        }
      }
    }
  }

  componentDidMount() {
    this.ref = base.syncState('ssot', {
      context: this,
      state: 'ssot'
    });
  }

  addService = (service) => {
    const services = {...this.state.ssot.services, [new Date().getTime()]: service};
    this.setState({ ssot: {...this.state.ssot, services: services} });    
  }

  deleteService = (id) => {
    const services = {...this.state.ssot.services};
    delete services[id];
    this.setState({ ssot: {...this.state.ssot, ['services']: services} });
  }  

  addEntity = (entity, id, key) => {
    const entityState = {...this.state[key], [id]: entity};
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }
  
  deleteEntity = (id, key) => {
    const entityState = {...this.state[key]};
    delete entityState[id];
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }

  updateEntity = (entity, id, key) => {
    const entityState = {...this.state[key], [id]: entity};
    this.setState({ ssot: {...this.state.ssot, [key]: entityState} });
  }

  filterServices = (service, searchText) => {
    if ( searchText === '' ) return true;
    
    for ( const serviceKey of Object.keys(service) ) {
      const serviceProp = service[serviceKey];

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
      const propValueA = this.state.ssot.services[a][criteria]
      const propValueB = this.state.ssot.services[b][criteria]
      
      if ( Array.isArray(propValueA) ) {
        itemA = propValueA.length ? this.state.ssot[criteria][propValueA[0]] : '';
        itemB = propValueB.length ? this.state.ssot[criteria][propValueB[0]] : '';

        itemA = itemA.name || '';
        itemB = itemB.name || '';
        
      } else {
        itemA = propValueA.toUpperCase();
        itemB = propValueB.toUpperCase();
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
    return Object.keys(this.state.ssot.services).find(key => {
      return this.state.ssot.services[key][entityType].indexOf(id) > -1;
    });      
  }
  
  getCustomerNameById = id => {
    return this.state.ssot.customers[id].name;
  }

  getDeviceById = id => {
    return `${this.state.ssot.devices[id].manufacturer} ${this.state.ssot.devices[id].model}`;
  }

  setNavActive = key => {    
    this.setState({ activeNavItemKey: key });
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
          filterServices={this.filterServices}      
          sortServices={this.sortServices}     
          addService={this.addService} 
          deleteService={this.deleteService}
          addEntity={this.addEntity} 
          deleteEntity={this.deleteEntity} 
          updateEntity={this.updateEntity} 
          findServiceByEntityId={this.findServiceByEntityId}
        />
      </React.Fragment>
    );
  }
}

export default App;
