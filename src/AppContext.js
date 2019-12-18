import React from 'react';
import LoadingSpinner from './components/UI/LoadingSpinner';
import base from './base';

// make a context
export const AppContext = React.createContext();

// make context provider component
export class AppProvider extends React.Component {
    state = {
        activeNavItemKey: "home",
        loaded: false,
        ssot: {
            services: {},
            actions: {},
            devices: {},
            customers: {}
        },
        filteredServicesArray: []
    }

    componentDidMount() {
        this.ref = base.syncState('ssot', {
            context: this,
            state: 'ssot'
        });
    }

    componentDidUpdate() {
        if (!this.state.loaded) {
            this.setState({ loaded: true });
        }
    }

    setNavActive = (key) => this.setState({ activeNavItemKey: key });
    setFilteredServicesArray = status => this.setState({ filteredServicesArray: status });
    renderLoadingSpinner = () => !this.state.loaded && <LoadingSpinner />;

    // Services filtering and sorting methods
    filterServices = (service, searchText, statusFilters) => {
        if (searchText === '' && !statusFilters.length) return true;

        // Filtering by service status
        if (statusFilters.length && (!statusFilters.includes(service.status))) {
            return false;
        }

        for (let serviceKey of Object.keys(service)) {
            let serviceProp;
            if (serviceKey === 'actions') {
                if (service[serviceKey] === '') {
                    serviceProp = ''
                } else {
                    serviceProp = service[serviceKey].map(actionItem => actionItem.actionId);
                }
            } else if (serviceKey === 'newDevices') {
                if (service[serviceKey] === '') {
                    serviceProp = ''
                } else {
                    serviceProp = service[serviceKey].map(deviceItem => deviceItem.deviceId);
                }
                serviceKey = 'devices';
            } else {
                serviceProp = service[serviceKey];
            }

            if (typeof serviceProp === 'boolean' || typeof serviceProp === 'number') continue;
            if (!Array.isArray(serviceProp)) {
                if (serviceProp.toLowerCase().includes(searchText.toLowerCase())) {
                    return true;
                }
            } else {
                for (const servicePropKey of serviceProp) {
                    const relatedObj = this.state.ssot[serviceKey][servicePropKey];
                    for (const relatedObjKey of Object.keys(relatedObj)) {
                        if (String(relatedObj[relatedObjKey]).toLowerCase().includes(searchText.toLowerCase())) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    sortServices = (arr, criteria, asc = true) => {

        return arr.sort((a, b) => {
            let itemA;
            let itemB;
            const propValueA = this.state.ssot.services[a][criteria];
            const propValueB = this.state.ssot.services[b][criteria];

            if (Array.isArray(propValueA)) {
                itemA = propValueA.length ? this.state.ssot[criteria][propValueA[0]] : '';
                itemB = propValueB.length ? this.state.ssot[criteria][propValueB[0]] : '';

                itemA = itemA.name || '';
                itemB = itemB.name || '';

            } else if (typeof propValueA === 'string') {
                itemA = propValueA.toLowerCase();
                itemB = propValueB.toLowerCase();
            } else { // Situation when we are sorting by date - so the type will be number
                // Needed to invert values here
                [itemA, itemB] = [propValueB, propValueA];
            }

            if (itemA < itemB) {
                return asc ? -1 : 1;
            }

            if (itemA > itemB) {
                return asc ? 1 : -1;
            }

            return 0;
        });
    }

    deleteService = (id) => {
        const services = { ...this.state.ssot.services };
        services[id] = null;
        this.setState({ ssot: { ...this.state.ssot, ['services']: services } });
    }

    addService = (service, serviceId) => {
        const services = { ...this.state.ssot.services, [serviceId]: service };
        this.setState({ ssot: { ...this.state.ssot, services: services } });
    }

    updateService = (service, id) => {
        const services = { ...this.state.ssot.services };
        services[id] = service;
        this.setState({ ssot: { ...this.state.ssot, services: services } });
    }

    // Entity Control Methods
    addEntity = (entity, id, key, isNewDevice) => {
        let entityState = { ...this.state[key], [id]: entity };
        if (isNewDevice) {
            entityState = {
                ...entityState, [id]: {
                    ...entityState[id],
                    isNewDevice: true
                }
            };
        }

        this.setState({ ssot: { ...this.state.ssot, [key]: entityState } });
    }

    deleteEntity = (id, key) => {
        const entityState = { ...this.state[key] };
        entityState[id] = null;
        this.setState({ ssot: { ...this.state.ssot, [key]: entityState } });
    }

    updateEntity = (entity, id, key) => {
        const entityState = { ...this.state[key], [id]: entity };
        this.setState({ ssot: { ...this.state.ssot, [key]: entityState } });
    }

    // Helper methods for getting the entity properties by ID
    getCustomerNameById = id => this.state.ssot.customers[id].name;
    getCustomerObjById = id => this.state.ssot.customers[id];

    getDeviceNameById = id => `${this.state.ssot.devices[id].manufacturer} ${this.state.ssot.devices[id].model}`;
    getDeviceSerialById = id => this.state.ssot.devices[id].serial;

    getActionNameById = id => this.state.ssot.actions[id].name;

    findServiceByEntityId = (id, entityType) => {
        if (entityType === 'actions') {
            return Object.keys(this.state.ssot.services).find(key => {
                // Checking if actions is an empty string or undefined
                if (!this.state.ssot.services[key][entityType]) return false;

                return this.state.ssot.services[key][entityType].find(actionItem => {
                    if (actionItem.actionId === id) {
                        return true;
                    }
                });
            });
        } else if (entityType === 'devices') {
            // need to do a check here to see 'isNewDevice'
            return Object.keys(this.state.ssot.services).find(key => {
                // Checking if isNewDevice
                if (this.state.ssot.devices[id].isNewDevice) {
                    if (!this.state.ssot.services[key]['newDevices']) return false;

                    return this.state.ssot.services[key]['newDevices'].find(deviceItem => {
                        if (deviceItem.deviceId === id) {
                            return true;
                        }
                    });
                }

                return Object.keys(this.state.ssot.services).find(key => {
                    return this.state.ssot.services[key][entityType].indexOf(id) > -1;
                });
            });
        } else {
            return Object.keys(this.state.ssot.services).find(key => {
                return this.state.ssot.services[key][entityType].indexOf(id) > -1;
            });
        }

    }

    render() {
        return (
            <AppContext.Provider value={{
                state: this.state,
                setNavActive: this.setNavActive,
                setFilteredServicesArray: this.setFilteredServicesArray,
                renderLoadingSpinner: this.renderLoadingSpinner,
                filterServices: this.filterServices,
                sortServices: this.sortServices,
                getCustomerNameById: this.getCustomerNameById,
                getCustomerObjById: this.getCustomerObjById,
                getDeviceNameById: this.getDeviceNameById,
                getDeviceSerialById: this.getDeviceSerialById,
                getActionNameById: this.getActionNameById,
                deleteService: this.deleteService,
                addService: this.addService,
                updateService: this.updateService,
                findServiceByEntityId: this.findServiceByEntityId,
                addEntity: this.addEntity,
                deleteEntity: this.deleteEntity,
                updateEntity: this.updateEntity
            }}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}