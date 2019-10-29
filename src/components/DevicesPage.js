import React from 'react';
import Header from './Header';
import Body from './Body';
import DisplayEntity from './DisplayEntity';
import CreateEntity from './CreateEntity';
import CreateEntityButton from './CreateEntityButton';
import Popup from './Popup';

const DevicesPage = (props) => {
    const [state, setState] = React.useState({
        showPopup: false
    });

    const hidePopup = () => {
        setState({ ...state, showPopup: false });
    }

    const showPopup = () => {
        setState({ ...state, showPopup: true });
    }

    // manufacturer: "HP",
    //     model: "Home Server",
    //         name: "HP Home Server",
    //             serial: "12345",

	const fields = [
        {
            name: 'name',
            label: 'Name',
            defaultVal: '',
            required: true
        },
        {
            name: 'manufacturer',
            label: 'Manufacturer',
            defaultVal: 0,
            required: false
        },
        {
            name: 'model',
            label: 'Model',
            defaultVal: 0,
            required: false
        },
        {
            name: 'serial',
            label: 'Serial',
            defaultVal: 0,
            required: false
        },
    ];

    const renderPopup = () => {
        if (state.showPopup) {
            return (
                <Popup hidePopup={hidePopup}>
                    <CreateEntity
                        name=""
                        addEntity={props.addEntity}
                        stateName="devices"
                        fields={fields}
                        isMulti={false}
                        isDirect={true}
                        hidePopup={hidePopup}
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
                <DisplayEntity
                    name="devices"
                    fields={fields}
                    entities={props.devices}
                    findServiceByEntityId={props.findServiceByEntityId}
                    deleteEntity={props.deleteEntity}
                    updateEntity={props.updateEntity}
                />
            </Body>
        </React.Fragment>
    );
}

export default DevicesPage;