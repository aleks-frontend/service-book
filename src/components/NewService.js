import React from 'react';
import Header from './Header';
import Body from './Body';
import ServiceForm from './ServiceForm';


const NewService = (props) => {
    return (
        <React.Fragment>
            <Header title="New Service" />
            <Body>
                <ServiceForm 
                    isUpdate={false} 
                    customers={props.customers}
                    devices={props.devices}
                    actions={props.actions}
                    addService={props.addService}
                    addEntity={props.addEntity}
                    showSnackbar={props.showSnackbar}
                    fields={props.fields}
                />
            </Body>
        </React.Fragment>
    );
}

export default NewService;
