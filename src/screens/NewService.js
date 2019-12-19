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
                    showSnackbar={props.showSnackbar}
                />
            </Body>
        </React.Fragment>
    );
}

export default ScreensNewService;
