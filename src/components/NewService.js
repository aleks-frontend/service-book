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
                border-color: red;
        }

        .select { flex: 1; }
`;

const NewService = (props) => {    
    // const [ state, setState ] = React.useState({
    //     showCreateCustomer: { show: false },
    //     showCreateDevice: { show: false },

    // });

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
        }
    }

    const [ showCreateEntity, updateShowCreateEntity ] = React.useState({
        customers: {show: false},
        devices: {show: false}
    });

    const [ selectedDropdownItems, updateSelectedDropdownItems ] = React.useState(defaultStates.selectedDropdownItems);
    const [ inputs, updateInputs ] = React.useState(defaultStates.inputs);
    const [ emptyRequiredInputs, updateEmptyRequiredInputs ] = React.useState({});

    const hideCreateEntityForm = (entityType) => {
        updateShowCreateEntity({...showCreateEntity, [entityType]: {show: false}});
    }

    const customerOptionsArr = Object.keys(props.customers).map(key => ({
        value: key,
        label: props.customers[key].name
    }));
    
    const deviceOptionsArr = Object.keys(props.devices).map(key => ({
        value: key,
        label: props.devices[key].name
    }));    

    const [ dropdownOptions, updateDropdownOptions ] = React.useState({
        customers: customerOptionsArr,
        devices: deviceOptionsArr,
    });

    const formReset = () => {
        updateInputs(defaultStates.inputs);
        updateSelectedDropdownItems(defaultStates.selectedDropdownItems);
    }

    const handleInputChange = (event) => {
        updateInputs({...inputs, [event.target.name]: {
            ...inputs[event.target.name],
            value: event.target.value
        }
        });
    }

    const handleCreateCustomer = (event) => {
        updateShowCreateEntity({...showCreateEntity, customers: {show: true, name: event}});
    }

    const handleCreateDevice = (event) => {    
        updateShowCreateEntity({...showCreateEntity, devices: {show: true, name: event}});
    }

    const handleDropdownChange =(event, actionMeta) => {
        let keysArr = [];
        if ( Array.isArray(event) ) {
            keysArr = event.map(obj => obj.value);
        } else {
            if ( event !== null ) {
                keysArr.push(event.value);
            }
        }

        updateShowCreateEntity({...showCreateEntity, [actionMeta.name]: {show: false, name: ''}});

        if ( event === null ) {
            updateSelectedDropdownItems({...selectedDropdownItems, [actionMeta.name]: ''});
        } else if ( !Array.isArray(event) ) {
            updateSelectedDropdownItems({...selectedDropdownItems, [actionMeta.name]:{
                value: event.value, 
                label: event.label
            }});
        } else {
            const selectedDropdownItemsArr = event.map(item => (
                {
                    value: item.value,
                    label: item.label
                }
            ));
            updateSelectedDropdownItems({...selectedDropdownItems, 
                [actionMeta.name]: selectedDropdownItemsArr
            });
        }
        
        updateInputs({...inputs, [actionMeta.name]: {
            ...inputs[actionMeta.name],
            value:  keysArr
        }
        });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let inputValues = {};
        const emptyRequiredInputsCopy = {...emptyRequiredInputs};
        for ( const key of Object.keys(inputs) ) {
            const input = inputs[key];
            const inputVal = input.value;
            
            // check for missing required fields here!
            const emptyArrayCheck = Array.isArray(inputVal) && inputVal.length === 0;
            const emptyNumCheck = typeof inputVal === 'number' && inputVal === 0;
            const emptyStringCheck = typeof inputVal === 'string' && inputVal === '';

            if ( input.required ) {
                if ( emptyArrayCheck || emptyNumCheck || emptyStringCheck ) {
                    emptyRequiredInputsCopy[key] = 'empty-required';
                } else {
                    delete emptyRequiredInputsCopy[key];
                }
            }

            inputValues[key] = inputVal;
        }

        updateEmptyRequiredInputs(emptyRequiredInputsCopy);
        if ( Object.keys(emptyRequiredInputsCopy).length ) return;
        props.addService(inputValues);
        formReset();
        props.showSnackbar('New service ', 'created');
    }

    const renderCreateCustomer = () => {
        const fields = props.fields.customers;

        if ( showCreateEntity['customers'].show ) {
            return <CreateEntity 
                        name={showCreateEntity['customers'].name} 
                        addEntity={addEntity}
                        stateName="customers"
                        fields={fields}
                        isMulti={false}
                        hideCreateEntityForm={hideCreateEntityForm}
                        showSnackbar={props.showSnackbar}
                    />;
        }
    }   
    
    const renderCreateDevice = () => {
        const fields = props.fields.devices;

        if ( showCreateEntity['devices'].show ) {
            return <CreateEntity 
                        name={showCreateEntity['devices'].name} 
                        addEntity={addEntity}
                        stateName="devices"
                        fields={fields}
                        isMulti={true}
                        hideCreateEntityForm={hideCreateEntityForm}
                        showSnackbar={props.showSnackbar}
                    />;
        }
    }

    const addEntity = (entity, stateKey, isMulti) => {
        const id = (new Date().getTime()).toString();
        const activeDropdownState = dropdownOptions[stateKey];
        const updatedDropdownState = [...activeDropdownState, {
            value: id,
            label: entity.name
        }];
        
        updateDropdownOptions({...dropdownOptions, [stateKey]: updatedDropdownState});

        if ( !isMulti ) {
            updateSelectedDropdownItems({...selectedDropdownItems, [stateKey]:{
                value: id, 
                label: entity.name
            }});
        } else {
            updateSelectedDropdownItems({...selectedDropdownItems, [stateKey]:[...selectedDropdownItems[stateKey], 
                { 
                    value: id, 
                    label: entity.name
                }
            ]});
        }

        props.addEntity(entity, id, stateKey);
        updateInputs({...inputs, [stateKey]: {
            ...inputs[stateKey],
            value: [...inputs[stateKey].value, id]
        }
        });
    }

    return (
        <React.Fragment>
            <Header title="New Service" />
            <Body>
                <StyledForm onSubmit={handleFormSubmit}>
                    <div 
                        className={emptyRequiredInputs['title'] ? 'group empty-required' : 'group'} 
                        >
                        <label>Title:</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={inputs.title.value} 
                            onChange={handleInputChange} 
                            />
                    </div>
                    <div 
                        className={emptyRequiredInputs['description'] ? 'group empty-required' : 'group'} 
                        >
                        <label>Description:</label>
                        <textarea 
                            name="description" 
                            value={inputs.description.value} 
                            onChange={handleInputChange} 
                            />
                    </div>
                    <div 
                        className={emptyRequiredInputs['customers'] ? 'group empty-required' : 'group'} 
                        >
                        <label>Customer:</label>
                        <CreatableSelect
                            options={dropdownOptions['customers']} 
                            className="select" 
                            name="customers"
                            value={selectedDropdownItems['customers']}
                            onChange={handleDropdownChange}
                            onCreateOption={handleCreateCustomer}  
                            isClearable
                        />
                    </div>
                    {renderCreateCustomer()}
                    <div 
                        className={emptyRequiredInputs['devices'] ? 'group empty-required' : 'group'} 
                        >
                        <label>Devices:</label>
                        <CreatableSelect
                            options={dropdownOptions['devices']}
                            className="select"
                            value={selectedDropdownItems['devices']}
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
