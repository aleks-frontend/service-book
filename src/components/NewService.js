import React from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import Header from './Header';
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
    const [ showCreateCustomer, updateShowCreateCustomer ] = React.useState({show: false});
    const [ showCreateDevice, updateShowCreateDevice ] = React.useState({show: false});
    const [ selectedDropdownItems, updateSelectedDropdownItems ] = React.useState({
        customers: {}, 
        devices: []
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
        updateShowCreateCustomer({show: true, name: event});
    }

    const handleCreateDevice = (event) => {
        updateShowCreateDevice({show: true, name: event});        
    }

    const handleDropdownChange =(event, actionMeta) => {
        let keysArr = [];
        if ( Array.isArray(event) ) {
            keysArr = event.map(obj => obj.value);
        } else {
            if ( event !== null ) {
                updateShowCreateCustomer({show: false, name: event});
                keysArr.push(event.value);
            }
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
                defaultVal: ''
            },
            {
                name: 'phone',
                label: 'Phone',
                defaultVal: 0
            },
            {
                name: 'email',
                label: 'Email',
                defaultVal: ''
            }
        ];

        if ( showCreateCustomer.show ) {
            return <CreateEntity 
                        name={showCreateCustomer.name} 
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

        if ( showCreateDevice.show ) {
            return <CreateEntity 
                        name={showCreateDevice.name} 
                        addEntity={addEntity}
                        stateName="devices"
                        fields={fields}
                        isMulti={true}
                    />;
        }
    }        

    const addEntity = (entity, stateKey, isMulti) => {        
        const id = new Date().getTime();
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
    }
    
    return (
        <React.Fragment>
            <Header title="New Service" />
            <div className="body">
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
            </div>
        </React.Fragment>
    );
}

export default NewService;