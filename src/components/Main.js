import React from 'react';
import Dashboard from './Dashboard';
import History from './History';
import NewService from './NewService';
import Customers from './Customers';
import Actions from './Actions';

const Main = (props) => {    
    const renderComponent = (props) => {        
        switch(props.activeNavItemKey) {
            case 'home':
                return <Dashboard />;
            case 'history':
                return <History 
                        services={props.services} 
                        getCustomerNameById={props.getCustomerNameById}
                        getDeviceById={props.getDeviceById} 
                        extendHistoryItem={props.extendHistoryItem}
                        filterServices={props.filterServices}
                        sortServices={props.sortServices}                        
                        />;
            case 'newService':
                return <NewService
                            customers={props.customers} 
                            devices={props.devices} 
                            addService={props.addService} 
                            addEntity={props.addEntity}
                        />
            case 'customers':
                return <Customers
                        customers={props.customers}
                        addEntity={props.addEntity} 
                        />;
            case 'actions':
                return <Actions />;
            default:
                return <Dashboard />;
        }        
    }

    return (
        <div className="main">
            {renderComponent(props)}
        </div>
    );
};

export default Main;