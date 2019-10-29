import React from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import History from './History';
import NewService from './NewService';
import Customers from './Customers';
import Actions from './Actions';

const StyledMain = styled.div`
    { flex: 1; }
`;

const Main = (props) => {    
    const renderComponent = (props) => {        
        switch(props.activeNavItemKey) {
            case 'home':
                return <Dashboard />;
            case 'history':
                return <History 
                        services={props.services} 
                        deleteService={props.deleteService}
                        getCustomerNameById={props.getCustomerNameById}
                        getDeviceById={props.getDeviceById} 
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
                        deleteEntity={props.deleteEntity}
                        updateEntity={props.updateEntity}
                        findServiceByEntityId={props.findServiceByEntityId}
                        />;
            case 'actions':
                return <Actions />;
            default:
                return <Dashboard />;
        }        
    }

    return (
        <StyledMain>
            {renderComponent(props)}
        </StyledMain>
    );
};

export default Main;