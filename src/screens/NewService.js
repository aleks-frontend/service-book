import React from 'react';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import ServiceForm from '../components/ServiceForm';


const ScreensNewService = (props) => {
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

export default ScreensNewService;
