import React from 'react';
import './App.css';
import Header from './components/Header';
import Logo from './components/Logo';
import Nav from './components/Nav';
import Body from './components/Body';

class App extends React.Component {
  state = {
    activeNavItemKey: "history",
    services: {
      service1: {
        description: "Service item 1",
        date: "11/09/19",
        remark: "some remark for service 1",
        status: "completed",
        extended: false,
        actions: ["action2"],
        devices: ["device1", "device2", "device3"],
        customers: ["customer1"],
      },
      service4: {
        description: "Service item 2",
        date: "15/09/19",
        remark: "some remark for service 3",
        status: "received",
        extended: false,
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer3"],
      },
      service2: {
        description: "Service item 3",
        date: "12/09/19",
        remark: "some remark for service 2",
        status: "received",
        extended: false,
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer2"],
      },
      service3: {
        description: "Service item 4",
        date: "13/09/19",
        remark: "some remark for service 3",
        status: "received",
        extended: false,
        actions: ["action1"],
        devices: ["device3"],
        customers: ["customer2"],
      },
      service5: {
        description: "Service item 5",
        date: "16/09/19",
        remark: "some remark for service 3",
        status: "received",
        extended: false,
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
        serial: "12345",
        description: "",
        services: [],
      },
      device2: {
        manufacturer: "AMD",
        model: "Radeon 9500",
        serial: "123456",
        description: "",
        services: []
      },
      device3: {
        manufacturer: "nVidia",
        model: "GeForce500",
        serial: "123456",
        description: "",
        services: []
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

  getCustomerNameById = id => {
    return this.state.customers[id].name;
  }

  getDeviceById = id => {
    return `${this.state.devices[id].manufacturer} ${this.state.devices[id].model}`;
  }

  extendHistoryItem = id => {
    const services = this.state.services;
    services[id].extended = !services[id].extended;

    this.setState({ services });
  }

  setNavActive = key => {    
    this.setState({ activeNavItemKey: key });
  }

  render() {
    return (
      <React.Fragment>
        <div className="side">
          <Logo />
          <Nav margin="2rem 0 0" activeNavItemKey={this.state.activeNavItemKey} setNavActive={this.setNavActive} />
        </div>
        <div className="main">
          <Header />
          <Body 
            activeNavItemKey={this.state.activeNavItemKey} 
            services={this.state.services}
            getCustomerNameById={this.getCustomerNameById} 
            getDeviceById={this.getDeviceById}     
            extendHistoryItem={this.extendHistoryItem}  
            filterServices={this.filterServices}      
            sortServices={this.sortServices}      
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
