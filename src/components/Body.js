import React from 'react';
import Dashboard from './Dashboard';
import History from './History';
import Customers from './Customers';
import Actions from './Actions';

const Body = (props) => {    
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
            case 'customers':
                return <Customers />;
            case 'actions':
                return <Actions />;
            default:
                return <Dashboard />;
        }        
    }

    return (
        <div className="body">
            {renderComponent(props)}
        </div>
    );
};

export default Body;