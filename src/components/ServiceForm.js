import React from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { PDFDownloadLink } from '@react-pdf/renderer';

import CreateEntity from './CreateEntity';
import ActionsTable from './ActionsTable';
import NewDevicesTable from './NewDevicesTable';
import Button from './UI/Button';
import PdfDispatchNote from './PDF/PdfDispatchNote';
import { breakpoints } from '../helpers';
import { statusEnum, colors } from '../helpers';

const StyledForm = styled.form`
    position: relative;
    overflow: ${props => props.isUpdate ? 'auto' : 'visible'};
    padding: 1.5rem 1.5rem 2.5rem;
    width: 80rem;
    max-width: 100%;
    max-height: ${props => props.isUpdate ? '100%' : 'none'};
    background: ${colors.lightgray2};
    border-radius: 0.4rem;

    .group {
        border: 1px solid transparent;
        margin-bottom: 0.5rem;

        label { 
            display: block;
            padding: 0.5rem 0.3rem;
            font-size: 1.2rem;
            color: #fff;
            background: ${colors.rdgray2};
            border-top-left-radius: 4px; 
            border-top-right-radius: 4px;
            
            @media screen and (${breakpoints.point1}) {
                line-height: 1.2em;
            } 
        }

        input[type="text"], textarea {
            display: block;
            width: 100%;
            padding: 0 0.5rem;
            height: 3.8rem;
            border: none;
            border-bottom-left-radius: 4px; 
            border-bottom-right-radius: 4px; 
            
            &:focus { outline: none; }
        }

        textarea { height: 6rem; } 

        select {
            width: 100%;
            height: 3rem; }

        &.empty-required { 
            color: red;
            border-color: red; }

        .select { 
            flex: 1; 
            border: none; }
    }
`;

const ServiceForm = (props) => {
    const defaultStates = {
        inputs: {
            title: {
                value: props.isUpdate ? props.service.title : `Service-${new Date().getTime()}`,
                required: true,
            },
            description: {
                value: props.isUpdate ? props.service.description : "",
                required: true,
            },
            customers: {
                value: props.isUpdate ? props.service.customers : "",
                required: true,
                isArray: true,
            },
            devices: {
                value: props.isUpdate ? props.service.devices : "",
                required: true,
                isArray: true,
            },
            status: {
                value: props.isUpdate ? props.service.status : statusEnum.RECEIVED,
                required: false,
                show: props.isUpdate
            },
            date: {
                value: props.isUpdate ? props.service.date : new Date().getTime(),
                required: false
            },
            remark: {
                value: props.isUpdate ? props.service.remark : "",
                required: false,
                show: props.isUpdate
            },
            actions: {
                value: props.isUpdate ? props.service.actions : "",
                isArray: true,
                required: false,
                show: props.isUpdate
            },
            newDevices: {
                value: props.isUpdate ? (props.service.newDevices ? props.service.newDevices : "") : "",
                required: false,
                show: props.isUpdate
            }

        },
        selectedDropdownItems: {
            customers: props.isUpdate ? props.service.customers.map(customerKey => {
                return { label: props.customers[customerKey].name, value: customerKey }
            }) : '',
            devices: props.isUpdate ? props.service.devices.map(deviceKey => {
                return { label: props.devices[deviceKey].name, value: deviceKey }
            }) : '',
        },
        customerOptionsArr: Object.keys(props.customers).map(key => ({
            value: key,
            label: props.customers[key].name
        })),
        deviceOptionsArr: Object.keys(props.devices).map(key => ({
            value: key,
            label: props.devices[key].name
        })),
        actionOptionsArr: Object.keys(props.actions).map(key => ({
            value: key,
            label: props.actions[key].name
        }))
    }

    /** Setting up the state **/
    const [state, setState] = React.useState({
        showCreateEntity: {
            customers: { show: false },
            devices: { show: false }
        },
        inputs: defaultStates.inputs,
        selectedDropdownItems: defaultStates.selectedDropdownItems,
        emptyRequiredInputs: {},
        dropdownOptions: {
            customers: defaultStates.customerOptionsArr,
            devices: defaultStates.deviceOptionsArr,
            actions: defaultStates.actionOptionsArr
        },
        showGeneratedPdfButton: false,
        tempInputs: {}
    });

    /** Helpper method for updating the state **/
    const updateState = (stateKey, stateObjKey, value, stateObjCopy) => {
        // We are not updating the actual state in this case
        // Used for cases when we are calling updateState several times in a single method
        if (stateObjCopy) {
            if (stateObjKey) {
                stateObjCopy[stateKey] = {
                    ...stateObjCopy[stateKey],
                    [stateObjKey]: value
                };
            } else {
                stateObjCopy[stateKey] = value;
            }
        } else {
            // This part will be used when we are calling the updateState once in a method
            // This will update the state directly
            if (stateObjKey) {
                setState({
                    ...state, [stateKey]: {
                        ...state[stateKey],
                        [stateObjKey]: value
                    }
                });
            } else {
                setState({ ...state, [stateKey]: value });
            }
        }
    }

    /** Additional helper method for updating the Actions state - 
     *  because of the different state structure  **/
    const updateActionsState = (actionRows) => {
        updateState('inputs', 'actions', {
            ...state.inputs.actions,
            value: actionRows
        });
    }

    const updateNewDevicesState = (newDevicesRows) => {
        updateState('inputs', 'newDevices', {
            ...state.inputs.newDevices,
            value: newDevicesRows
        });
    }

    /** Helper method for hiding the Create Entity Form **/
    const hideCreateEntityForm = (entityType, stateCopy) => updateState('showCreateEntity', entityType, { show: false }, stateCopy);

    /** Helper method for reseting the form after it's submitted **/
    const formReset = () => {
        const stateCopy = { ...state };

        updateState('inputs', null, defaultStates.inputs, stateCopy);
        updateState('selectedDropdownItems', null, defaultStates.selectedDropdownItems, stateCopy);
        updateState('showGeneratedPdfButton', null, false, stateCopy);

        setState(stateCopy);
    }

    /** Helper method for adding the new entity to the local state **/
    const addEntity = (entity, stateKey, isMulti) => {
        const id = (new Date().getTime()).toString();
        const stateCopy = { ...state };
        const activeDropdownState = state.dropdownOptions[stateKey];
        const updatedDropdownState = [...activeDropdownState, {
            value: id,
            label: entity.name
        }];

        updateState('dropdownOptions', stateKey, updatedDropdownState, stateCopy);

        if (!isMulti) {
            updateState('selectedDropdownItems', stateKey, {
                value: id,
                label: entity.name
            }, stateCopy);
        } else {
            updateState('selectedDropdownItems', stateKey, [
                ...stateCopy.selectedDropdownItems[stateKey],
                {
                    value: id,
                    label: entity.name
                }
            ], stateCopy);
        }

        props.addEntity(entity, id, stateKey);
        updateState('inputs', stateKey, {
            ...stateCopy.inputs[stateKey],
            value: [...stateCopy.inputs[stateKey].value, id]
        }, stateCopy);

        hideCreateEntityForm(stateKey, stateCopy);

        setState({ ...stateCopy });
    }

    /** Event Handler Methods **/
    const handleInputChange = (event) => {
        updateState('inputs', event.target.name, {
            ...state.inputs[event.target.name],
            value: event.target.value
        });
    }

    const handleCreateCustomer = (event) => {
        updateState('showCreateEntity', 'customers', { show: true, name: event });
    }

    const handleCreateDevice = (event) => {
        updateState('showCreateEntity', 'devices', { show: true, name: event });
    }

    const handleDropdownChange = (event, actionMeta) => {
        let keysArr = [];
        const stateCopy = { ...state };
        if (Array.isArray(event)) {
            keysArr = event.map(obj => obj.value);
        } else {
            if (event !== null) {
                keysArr.push(event.value);
            }
        }

        updateState('showCreateEntity', actionMeta.name, { show: false, name: '' }, stateCopy);

        if (event === null) {
            updateState('selectedDropdownItems', actionMeta.name, '', stateCopy);
        } else if (!Array.isArray(event)) {
            updateState('selectedDropdownItems', actionMeta.name, {
                value: event.value,
                label: event.label
            }, stateCopy);
        } else {
            const selectedDropdownItemsArr = event.map(item => (
                {
                    value: item.value,
                    label: item.label
                }
            ));

            updateState('selectedDropdownItems', actionMeta.name, selectedDropdownItemsArr, stateCopy);
        }

        updateState('inputs', actionMeta.name, {
            ...state.inputs[actionMeta.name],
            value: keysArr
        }, stateCopy);

        // We are now setting the stateCopy to the actual state
        setState(stateCopy);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let inputValues = {};
        const emptyRequiredInputsCopy = { ...state.emptyRequiredInputs };
        for (const key of Object.keys(state.inputs)) {
            const input = state.inputs[key];

            if (input.show === false) {
                inputValues[key] = defaultStates.inputs[key].value;
                continue;
            }

            let inputVal = input.value;


            // check for missing required fields here!
            const emptyArrayCheck = input.isArray && inputVal === "";
            const emptyNumCheck = typeof inputVal === 'number' && inputVal === 0;
            const emptyStringCheck = typeof inputVal === 'string' && inputVal === '';

            if (input.required) {
                if (emptyArrayCheck || emptyNumCheck || emptyStringCheck) {
                    emptyRequiredInputsCopy[key] = 'empty-required';
                } else {
                    delete emptyRequiredInputsCopy[key];
                }
            }

            // Hack for converting an empty array to string - because Firebase is not supporting empty arrays
            if (input.isArray && Array.isArray(inputVal) && inputVal.length === 0) {
                inputVal = '';
            }

            inputValues[key] = inputVal;

            // Hiding the Popup if we are in the `UpdateService' form and all required inputs are filled in
            if (props.isUpdate && !Object.keys(emptyRequiredInputsCopy).length) {
                props.hidePopup();
            }
        }

        let stateCopy = { ...state };
        updateState('emptyRequiredInputs', null, emptyRequiredInputsCopy, stateCopy);
        if (Object.keys(emptyRequiredInputsCopy).length) {
            setState(stateCopy);
            props.showSnackbar('Required field(s) ', 'missing');
        } else {
            if (!props.isUpdate) {
                props.addService(inputValues);
                // Showing the 'Generate PDF' button
                updateState('showGeneratedPdfButton', null, true, stateCopy);
                // Saving current inputs from the stateCopy to 'tempInputs' state
                // cause 'inputs' state will be reset before the PDF is generated
                // so we temporary store it here and pass this data to PdfDispatchNote 
                updateState('tempInputs', null, stateCopy['inputs'], stateCopy);
                props.showSnackbar('New service ', 'created');
            } else {
                props.updateService(inputValues, props.serviceId);
                props.showSnackbar('Service ', 'updated');
            }

            setState(stateCopy);
        }
    }

    const downloadPDF = () => {
        if (state.pdfGenerated) {
            const data = window.URL.createObjectURL(state.pdfBlob);
            const link = document.createElement('a');
            link.href = data;
            link.download = `dispatch-note-${state.inputs.title.value}.pdf`;
            link.click();

            formReset();
        }
    }

    /** Render Methods **/
    const renderCreateCustomer = () => {
        const fields = props.fields.customers;

        if (state.showCreateEntity['customers'].show) {
            return <CreateEntity
                name={state.showCreateEntity['customers'].name}
                addEntity={addEntity}
                stateName="customers"
                fields={fields}
                isMulti={false}
                showSnackbar={props.showSnackbar}
            />;
        }
    }

    const renderCreateDevice = () => {
        const fields = props.fields.devices;

        if (state.showCreateEntity['devices'].show) {
            return <CreateEntity
                name={state.showCreateEntity['devices'].name}
                addEntity={addEntity}
                stateName="devices"
                fields={fields}
                isMulti={true}
                showSnackbar={props.showSnackbar}
            />;
        }
    }

    const renderUpdateFields = () => {
        if (props.isUpdate) {
            return (
                <React.Fragment>
                    <div className="group">
                        <label>Actions:</label>
                        <ActionsTable
                            mainStateActions={props.actions}
                            actions={state.inputs.actions}
                            addEntity={props.addEntity}
                            updateServiceFormActionsState={updateActionsState}
                        />
                    </div>
                    <div className="group">
                        <label>New Devices:</label>
                        <NewDevicesTable
                            fields={props.fields.devices}
                            mainStateDevices={props.devices}
                            newDevices={state.inputs.newDevices}
                            addEntity={props.addEntity}
                            updateServiceFormNewDevicesState={updateNewDevicesState}
                            showSnackbar={props.showSnackbar}
                            getDeviceNameById={props.getDeviceNameById}
                        />
                    </div>
                    <div className="group">
                        <label>Remarks:</label>
                        <textarea
                            name="remark"
                            value={state.inputs.remark.value}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <div className="group">
                        <label>Status:</label>
                        <select
                            name="status"
                            value={state.inputs.status.value}
                            onChange={handleInputChange}
                        >
                            <option value={statusEnum.RECEIVED}>Received</option>
                            <option value={statusEnum.INPROGRESS}>In Progress</option>
                            <option value={statusEnum.COMPLETED}>Completed</option>
                            <option value={statusEnum.SHIPPED}>Shipped</option>
                        </select>
                    </div>
                </React.Fragment>
            );
        }
    };

    const renderCancelButton = () => {
        if (props.isUpdate) {
            return (
                <Button
                    type="button"
                    onClick={props.hidePopup}
                    isText={true}
                    isText={true}
                >Cancel</Button>
            );
        }
    }

    const renderResetButton = () => {
        if (state.showGeneratedPdfButton) {
            return (
                <Button
                    type="button"
                    margin="0 0.5rem"
                    onClick={formReset}
                >Reset</Button>
            );
        }
    }    

    const renderGeneratePdfButton = () => {
        if (state.showGeneratedPdfButton) {
            return (
                <React.Fragment>
                    <Button
                        type="button"
                        margin="0 0 0 0.5rem"
                        onClick={downloadPDF}
                        disabled={!state.pdfGenerated}
                    >
                        {state.pdfGenerated ? 'Download PDF' : 'Generating PDF...'}
                    </Button>
                    <PDFDownloadLink
                        document={<PdfDispatchNote
                            inputs={state.tempInputs}
                            customers={props.customers}
                            devices={props.devices}
                        />}
                        fileName={`dispatch-note-${state.inputs.title.value}.pdf`}
                    >
                        {({ loading, blob }) => {
                            if (!loading && !state.pdfGenerated) {
                                setState({
                                    ...state,
                                    pdfBlob: blob,
                                    pdfGenerated: true
                                });
                            }
                        }}
                    </PDFDownloadLink>
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            <StyledForm
                onSubmit={handleFormSubmit}
                onClick={e => e.stopPropagation()}
                isUpdate={props.isUpdate}
            >
                <div
                    className={state.emptyRequiredInputs['title'] ? 'group empty-required' : 'group'}
                >
                    <label>{state.inputs.title.required && '* '}Title:</label>
                    <input
                        type="text"
                        name="title"
                        disabled={state.showGeneratedPdfButton}
                        value={state.inputs.title.value}
                        onChange={handleInputChange}
                    />
                </div>
                <div
                    className={state.emptyRequiredInputs['description'] ? 'group empty-required' : 'group'}
                >
                    <label>{state.inputs.description.required && '* '}Description:</label>
                    <textarea
                        name="description"
                        disabled={state.showGeneratedPdfButton}
                        value={state.inputs.description.value}
                        onChange={handleInputChange}
                    />
                </div>
                <div
                    className={state.emptyRequiredInputs['customers'] ? 'group empty-required' : 'group'}
                >
                    <label>{state.inputs.customers.required && '* '}Customer:</label>
                    <CreatableSelect
                        options={state.dropdownOptions['customers']}
                        className="select"
                        name="customers"
                        isDisabled={state.showGeneratedPdfButton}
                        value={state.selectedDropdownItems['customers']}
                        onChange={handleDropdownChange}
                        onCreateOption={handleCreateCustomer}
                        isClearable
                    />
                </div>
                {renderCreateCustomer()}
                <div
                    className={state.emptyRequiredInputs['devices'] ? 'group empty-required' : 'group'}
                >
                    <label>{state.inputs.devices.required && '* '}Devices:</label>
                    <CreatableSelect
                        options={state.dropdownOptions['devices']}
                        className="select"
                        value={state.selectedDropdownItems['devices']}
                        isMulti
                        name="devices"
                        isDisabled={state.showGeneratedPdfButton}
                        onCreateOption={handleCreateDevice}
                        onChange={handleDropdownChange}
                    />
                </div>
                {renderCreateDevice()}
                {renderUpdateFields()}
                <Button
                    type="submit"
                    onClick={handleFormSubmit}
                    disabled={state.showGeneratedPdfButton}
                >
                    {props.isUpdate ? 'Update' : 'Create'}
                </Button>
                {renderCancelButton()}
                {renderGeneratePdfButton()}
                {renderResetButton()}
            </StyledForm>
        </React.Fragment>
    );
}

export default ServiceForm;
