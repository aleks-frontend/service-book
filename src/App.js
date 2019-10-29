import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Nav from './components/Nav';
import Main from './components/Main';
import Side from './components/Side';

class App extends React.Component {
  state = {
    activeNavItemKey: "newService",
    services: {
      service1: {
        title: "Service item 1",
        description: "some description",
        date: "11/09/19",
        remark: "some remark for service 1",
        status: "completed",
        actions: ["action2"],
        devices: ["device1", "device2", "device3"],
        customers: ["customer1"],
      },
      service4: {
        title: "Service item 2",
        description: "some description",
        date: "15/09/19",
        remark: "some remark for service 3",
        status: "received",
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer3"],
      },
      service2: {
        title: "Service item 3",
        description: "some description",
        date: "12/09/19",
        remark: "some remark for service 2",
        status: "received",
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer2"],
      },
      service3: {
        title: "Service item 4",
        description: "some description",
        date: "13/09/19",
        remark: "some remark for service 3",
        status: "received",
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer2"],
      },
      service5: {
        title: "Service item 5",
        description: "some description",
        date: "16/09/19",
        remark: "some remark for service 3",
        status: "received",
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer4"],
      },
    },
    actions: {
      action1: {
        name: "Windows intallation",
        price: 1500
      },
      action2: {
        name: "Laptop cleanup",
        price: 2000
      }
    },
    devices: {
      device1: {
        manufacturer: "HP",
        model: "Home Server",
        name: "HP Home Server",
        serial: "12345",
        title: ""
      },
      device2: {
        manufacturer: "AMD",
        model: "Radeon 9500",
        name: "AMD Radeon 9500",
        serial: "123456",
        title: ""
      },
      device3: {
        manufacturer: "nVidia",
        model: "GeForce500",
        name: "nVidia GeForce500",
        serial: "123456",
        title: ""
      }
    },
    customers: {
      customer1: {
        name: "Aleksandar Gojkovic",
        phone: "064/109-61-57",
        email: "aleksfrontend@gmail.com",
        facebook: "/",
      },
      customer2: {
        name: "Elod Csizser",
        phone: "064/109-61-57",
        email: "crazyelod87@gmail.com",
        facebook: "/crazyelod87",
      },
      customer3: {
        name: "Pavle Gojkovic",
        phone: "064/109-61-57",
        email: "pavle@gmail.com",
        facebook: "/pavle",
      },
      customer4: {
        name: "Dragana Gojkovic",
        phone: "064/109-61-57",
        email: "dada@gmail.com",
        facebook: "/dada",
      }
    }
  }

  addService = (service) => {
    const services = {...this.state.services, [new Date().getTime()]: service};
    this.setState({ services });    
  }

  deleteService = (id) => {
    const services = {...this.state.services};
    delete services[id];
    this.setState({ services });
  }  

  addEntity = (entity, id, key) => {
    const entityState = {...this.state[key], [id]: entity};
    this.setState({ [key]: entityState });    
  }

  deleteEntity = (id) => {
    const customers = {...this.state.customers};
    delete customers[id];
    this.setState({ customers });
  }

  updateEntity = (entity, id, key) => {
    const customers = {...this.state.customers, [id]: entity};
    this.setState({customers});
  }

  filterServices = (service, searchText) => {
    if ( searchText === '' ) return true;
    
    for ( const serviceKey of Object.keys(service) ) {
      const serviceProp = service[serviceKey];

      if ( typeof serviceProp === 'boolean' ) continue;
      if ( !Array.isArray(serviceProp)  ) {
        if ( serviceProp.toLowerCase().includes(searchText.toLowerCase()) ) {
          return true;
        }
      } else {
        for ( const servicePropKey of serviceProp ) {
          const relatedObj = this.state[serviceKey][servicePropKey];
          
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
      const propValueA = this.state.services[a][criteria]
      const propValueB = this.state.services[b][criteria]
      
      if ( Array.isArray(propValueA) ) {
        itemA = propValueA.length ? this.state[criteria][propValueA[0]] : '';
        itemB = propValueB.length ? this.state[criteria][propValueB[0]] : '';

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
    return Object.keys(this.state.services).find(key => {
      return this.state.services[key][entityType].indexOf(id) > -1;
    });      
  }
  
  getCustomerNameById = id => {
    return this.state.customers[id].name;
  }

  getDeviceById = id => {
    return `${this.state.devices[id].manufacturer} ${this.state.devices[id].model}`;
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
          services={this.state.services}
          customers={this.state.customers}
          devices={this.state.devices}
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
