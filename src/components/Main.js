import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Dashboard from './Dashboard';
import { fields } from '../helpers';
import History from './History';
import NewService from './NewService';
import Customers from './Customers';
import Actions from './Actions';
import DevicesPage from './DevicesPage';

const StyledMain = styled.div`
    flex: 1;
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
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            case 'customers':
                return <Customers
                    customers={props.customers}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            case 'actions':
                return <Actions
                    actions={props.actions}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            case 'devices':
                return <DevicesPage
                    devices={props.devices}
                    addEntity={props.addEntity}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                    findServiceByEntityId={props.findServiceByEntityId}
                    showSnackbar={showSnackbar}
                    fields={fields}
                />;
            default:
                return <Dashboard />;
        }
    }

    return (
        <StyledMain>
            {renderComponent(props)}
            {renderSnackbar()}
        </StyledMain>
    );
};

export default Main;