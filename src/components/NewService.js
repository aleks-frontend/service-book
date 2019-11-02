import React from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import Header from './Header';
import Body from './Body';
import CreateEntity from './CreateEntity';

const StyledForm = styled.form`
    max-width: 80%;
    padding: 1rem;
    background: #fff;
    border: 1px solid #000;

    .group {
        display: flex; 
        align-items: center;
        padding: 0.3rem;
        border: 1px solid transparent;
        margin-bottom: 1rem;

        label { margin-right: 1rem; }

        input[type="text"], textarea {
            flex: 1;
            padding: 0 0.5rem;
            height: 38px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px; }

        &.empty-required { 
            color: red;
            border-color: red; }

        .select { flex: 1; }
    }
`;

const NewService = (props) => {
    const defaultStates = {
        inputs: {
            title: {
                value: "",
                required: true,
            },
            description: {
                value: "",
                required: true,
            },
            customers: {
                value: [],
                required: true,
            },
            devices: {
                value: [],
                required: true,
            },
            status: {
                value: "received",
                required: false
            },
            date: {
                value: new Date().getTime(),
                required: false
            }
        },
        selectedDropdownItems: {
            customers: '',
            devices: ''
        },
        customerOptionsArr: Object.keys(props.customers).map(key => ({
            value: key,
            label: props.customers[key].name
        })),
        deviceOptionsArr: Object.keys(props.devices).map(key => ({
            value: key,
            label: props.devices[key].name
        }))
    }
    
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
        }
    });

    const updateState = (stateKey, stateObjKey, value, stateObjCopy) => {        
        // We are not updating the actual state in this case
        // Used for cases when we are calling updateState several times in a single method
        if ( stateObjCopy ) {
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

    const hideCreateEntityForm = (entityType, stateCopy) => updateState('showCreateEntity', entityType, { show: false }, stateCopy);

    const formReset = (stateCopy) => {        
        updateState('inputs', null, defaultStates.inputs, stateCopy);
        updateState('selectedDropdownItems', null, defaultStates.selectedDropdownItems, stateCopy);

        // setState(stateCopy);
        return stateCopy;
    }

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
        const stateCopy = {...state};
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
            const inputVal = input.value;

            // check for missing required fields here!
            const emptyArrayCheck = Array.isArray(inputVal) && inputVal.length === 0;
            const emptyNumCheck = typeof inputVal === 'number' && inputVal === 0;
            const emptyStringCheck = typeof inputVal === 'string' && inputVal === '';

            if (input.required) {
                if (emptyArrayCheck || emptyNumCheck || emptyStringCheck) {
                    emptyRequiredInputsCopy[key] = 'empty-required';
                } else {
                    delete emptyRequiredInputsCopy[key];
                }
            }

            inputValues[key] = inputVal;
        }

        const stateCopy = {...state};
        updateState('emptyRequiredInputs', null, emptyRequiredInputsCopy, stateCopy);
        if (Object.keys(emptyRequiredInputsCopy).length) {
            setState(stateCopy);
        } else {
            props.addService(inputValues);
            formReset(stateCopy);
            props.showSnackbar('New service ', 'created');
            
            setState(stateCopy);
        }
    }

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

    const addEntity = (entity, stateKey, isMulti) => {
        const id = (new Date().getTime()).toString();
        const stateCopy = {...state};
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

        setState({...stateCopy});
    }

    return (
        <React.Fragment>
            <Header title="New Service" />
            <Body>
                <StyledForm onSubmit={handleFormSubmit}>
                    <div
                        className={state.emptyRequiredInputs['title'] ? 'group empty-required' : 'group'}
                    >
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={state.inputs.title.value}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={state.emptyRequiredInputs['description'] ? 'group empty-required' : 'group'}
                    >
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={state.inputs.description.value}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div
                        className={state.emptyRequiredInputs['customers'] ? 'group empty-required' : 'group'}
                    >
                        <label>Customer:</label>
                        <CreatableSelect
                            options={state.dropdownOptions['customers']}
                            className="select"
                            name="customers"
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
                        <label>Devices:</label>
                        <CreatableSelect
                            options={state.dropdownOptions['devices']}
                            className="select"
                            value={state.selectedDropdownItems['devices']}
                            isMulti
                            name="devices"
                            onCreateOption={handleCreateDevice}
                            onChange={handleDropdownChange}
                        />
                    </div>
                    {renderCreateDevice(props)}
                    <button type="submit">Create</button>
                </StyledForm>
            </Body>
        </React.Fragment>
    );
}

export default NewService;
