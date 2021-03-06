import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { AppContext } from '../AppContext';
import ScreensDashboard from '../screens/Dashboard';
import ScreensHistory from '../screens/History';
import ScreensNewService from '../screens/NewService';
import ScreensCustomers from '../screens/Customers';
import ScreensActions from '../screens/Actions';
import ScreensDevices from '../screens/Devices';

const StyledMain = styled.div`
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;

    /* Changing the font size of the snackbar */
    .MuiSnackbarContent-root { font-size: 1.2rem; }
`;

const useStyles = makeStyles(theme => ({
    close: {
        padding: theme.spacing(0.5),
    }
}));

const Main = () => {
    const context = React.useContext(AppContext);
    const classes = useStyles();
    /** Setting up the state **/
    const [state, setState] = React.useState({
        snackbarVisible: false,
        snackbarEntity: '',
        snackBarAction: ''
    });


    /** Event Handler Methods **/
    const handleClose = (reason) => {
        if (reason === 'clickaway') return;
        setState({ ...state, snackbarVisible: false });
    };

    const showSnackbar = (entityType, actionLabel) => {
        setState({
            ...state,
            snackbarVisible: true,
            snackbarEntity: entityType,
            snackbarAction: actionLabel
        });
    }

    /** Render Methods **/
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

    const renderComponent = () => {
        switch (context.state.activeNavItemKey) {
            case 'home':
                return <ScreensDashboard />;
            case 'history':
                return <ScreensHistory showSnackbar={showSnackbar} />;
            case 'newService':
                return <ScreensNewService
                    showSnackbar={showSnackbar}
                    isUpdate={true}
                />;
            case 'customers':
                return <ScreensCustomers showSnackbar={showSnackbar} />;
            case 'actions':
                return <ScreensActions showSnackbar={showSnackbar} />;
            case 'devices':
                return <ScreensDevices showSnackbar={showSnackbar} />;
            default:
                return <ScreensDashboard />;
        }
    }

    return (
        <StyledMain>
            {renderComponent()}
            {renderSnackbar()}
            {context.renderLoadingSpinner()}
        </StyledMain>
    );
};

export default Main;
