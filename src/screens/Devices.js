import React from 'react';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import DisplayEntity from '../components/DisplayEntity';
import CreateEntity from '../components/CreateEntity';
import CreateEntityButton from '../components/UI/CreateEntityButton';
import Popup from '../components/UI/Popup';
import { AppContext } from '../AppContext';
import { fields } from '../helpers';

const ScreensDevices = (props) => {
    const context = React.useContext(AppContext);

    /** Setting up the state **/
    const [state, setState] = React.useState({
        showPopup: false
    });

    /** Helper methods for hiding the showing the popup **/
    const hidePopup = () => setState({ ...state, showPopup: false });
    const showPopup = () => setState({ ...state, showPopup: true });

    const deviceFields = fields.devices;

    /** Render Methods **/
    const renderPopup = () => {
        if (state.showPopup) {
            return (
                <Popup hidePopup={hidePopup}>
                    <CreateEntity
                        name=""
                        stateName="devices"
                        fields={deviceFields}
                        addEntity={context.addEntity}
                        isMulti={false}
                        isDirect={true}
                        hidePopup={hidePopup}
                        showSnackbar={props.showSnackbar}
                    />
                </Popup>
            );
        }
    }
    return (
        <React.Fragment>
            {renderPopup()}
            <Header title="Devices">
                <CreateEntityButton showPopup={showPopup} entity="devices" />
            </Header>
            <Body>
                <CreateEntityButton
                    entity="Device"
                    showPopup={showPopup}
                    injectIntoTable={true} />
                <DisplayEntity
                    name="devices"
                    fields={deviceFields}
                    entities={context.state.ssot.devices}
                    showSnackbar={props.showSnackbar}
                />
            </Body>
        </React.Fragment>
    );
}

export default ScreensDevices;