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
            margin-bottom: 1rem;

            label { margin-right: 1rem; }

            input[type="text"], textarea {
                flex: 1;
                height: 38px;
                border: 1px solid rgb(204, 204, 204);
                border-radius: 4px;
            }
        }

        .select {
            flex: 1;
        }        
    }

`;

const NewService = (props) => {    
    // const [ state, setState ] = React.useState({
    //     showCreateCustomer: { show: false },
    //     showCreateDevice: { show: false },

    // });

    const [ showCreateEntity, updateShowCreateEntity ] = React.useState({
        customers: {show: false},
        devices: {show: false}
    });

    const [ selectedDropdownItems, updateSelectedDropdownItems ] = React.useState({
        customers: '', 
        devices: ''
    });

    const [ inputs, updateInputs ] = React.useState({
        title: "",
        description: "",
        customers: [],
        devices: [],
        status: "received",
        date: new Date().getTime()
    });

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

    const handleInputChange = (event) => {
        updateInputs({...inputs, [event.target.name]: event.target.value});
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
        
        updateInputs({...inputs, [actionMeta.name]: keysArr});
    }
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addService(inputs);
    }
    
    const renderCreateCustomer = () => {
        const fields = [
            {
                name: 'name',
                label: 'Name',
                defaultVal: '',
                required: true,
            },
            {
                name: 'phone',
                label: 'Phone',
                defaultVal: 0,
                required: true,
            },
            {
                name: 'email',
                label: 'Email',
                defaultVal: '',
                required: true,
            }
        ];

        if ( showCreateEntity['customers'].show ) {
            return <CreateEntity 
                        name={showCreateEntity['customers'].name} 
                        addEntity={addEntity}
                        stateName="customers"
                        fields={fields}
                        isMulti={false}
                    />;
        }
    }   
    
    const renderCreateDevice = () => {
        // manufacturer: "HP",
        // model: "Home Server",
        // name: "HP Home Server",
        // serial: "12345",
        // title: ""
        const fields = [
            {
                name: 'name',
                label: 'Name',
                defaultVal: ''
            },
            {
                name: 'manufacturer',
                label: 'Manufacturer',
                defaultVal: ''
            },
            {
                name: 'model',
                label: 'Model',
                defaultVal: 0
            },
            {
                name: 'serial',
                label: 'Serial',
                defaultVal: ''
            },
            {
                name: 'title',
                label: 'Title',
                defaultVal: ''
            },
        ];

        if ( showCreateEntity['devices'].show ) {
            return <CreateEntity 
                        name={showCreateEntity['devices'].name} 
                        addEntity={addEntity}
                        stateName="devices"
                        fields={fields}
                        isMulti={true}
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
        updateInputs({...inputs, [stateKey]: [...inputs[stateKey], id]});
    }
    
    return (
        <React.Fragment>
            <Header title="New Service" />
            <Body>
                <StyledForm onSubmit={handleFormSubmit}>
                    <div className="group">
                        <label>Title:</label>
                        <input type="text" name="title" value={inputs.title} onChange={handleInputChange} />
                    </div>
                    <div className="group">
                        <label>Description:</label>                            
                        <textarea name="description" value={inputs.description} onChange={handleInputChange} />
                    </div>
                    <div className="group">
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
                    <div className="group">
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
                    {renderCreateDevice()}
                    <button type="submit">Create</button>
                </StyledForm>
            </Body>
        </React.Fragment>
    );
}

export default NewService;