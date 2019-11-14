import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ScreensDashboard from '../screens/Dashboard';
import { fields } from '../helpers';
import ScreensHistory from '../screens/History';
import ScreensNewService from '../screens/NewService';
import ScreensCustomers from '../screens/Customers';
import ScreensActions from '../screens/Actions';
import ScreensDevices from '../screens/Devices';

const StyledMain = styled.div`
    flex: 1;
    overflow: auto;
`;

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    },
}));

const Main = (props) => {
    const classes = useStyles();
    const [ state, setState ] = React.useState({
        snackbarVisible: false,
        snackbarEntity: '',
        snackBarAction: ''
    });

    const handleClose = (reason) => {
        if (reason === 'clickaway') return;
        setState({...state, snackbarVisible: false});
    };

    const showSnackbar = (entityType, actionLabel) => {
        setState({...state, 
            snackbarVisible: true,
            snackbarEntity: entityType,
            snackbarAction: actionLabel
        });
    }

    const renderSnackbar = () => {
        const formatedEntityType = state.snackbarEntity.charAt(0).toUpperCase() + state.snackbarEntity.slice(1, -1);
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={state.snackbarVisible}
                autoHideDuration={3000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{formatedEntityType} {state.snackbarAction}!</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                        >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        );
    }

    const renderComponent = (props) => {
        switch (props.activeNavItemKey) {
            case 'home':
                return <ScreensDashboard />;
            case 'history':
                return <ScreensHistory
                    customers={props.customers}
                    devices={props.devices}
                    actions={props.actions}
                    updateService={props.updateService}
                    addEntity={props.addEntity}
                    showSnackbar={showSnackbar}                
                    services={props.services}
                    deleteService={props.deleteService}
                    getCustomerNameById={props.getCustomerNameById}
                    getDeviceById={props.getDeviceById}
                    getActionNameById={props.getActionNameById}
                    filterServices={props.filterServices}
                    sortServices={props.sortServices}
                />;
            case 'newService':
                return <ScreensNewService
                    customers={props.customers}
                    devices={props.devices}
                    actions={props.actions}
                    addService={props.addService}
                    addEntity={props.addEntity}
                    showSnackbar={showSnackbar}
                    fields={fields}
                    isUpdate={true}
                />;
            case 'customers':
                return <ScreensCustomers
                    customers={props.customers}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            case 'actions':
                return <ScreensActions
                    actions={props.actions}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            case 'devices':
                return <ScreensDevices
                    devices={props.devices}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            default:
                return <ScreensDashboard />;
        }
    }

    return (
        <StyledMain>
            {renderComponent(props)}
            {renderSnackbar()}
            {props.renderLoadingSpinner()}
        </StyledMain>
    );
};

export default Main;