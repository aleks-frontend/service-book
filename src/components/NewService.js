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
    const [ showCreateCustomer, updateShowCreateCustomer ] = React.useState(false);
    const [ selectedCustomer, updateSelectedCustomer ] = React.useState();
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

    const [ selectOptions, updateSelectOptions ] = React.useState({
        customers: customerOptionsArr,
        devices: deviceOptionsArr,
    });

    const handleInputChange = (event) => {
        updateInputs({...inputs, [event.target.name]: event.target.value});
    }

    const handleCreateCustomer = (event) => {
        updateShowCreateCustomer({show: true, name: event});        
    }

    const handleSelectChange =(event, actionMeta) => {
        let keysArr = [];
        if ( Array.isArray(event) ) {
            keysArr = event.map(obj => obj.value);
        } else {
            if ( event !== null ) {
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
                    />;
        }
    }    

    const addEntity = (entity, stateKey) => {        
        const id = new Date().getTime();
        const selectState = selectOptions[stateKey];
        const updatedSelectState = [...selectState, {
            value: id,
            label: entity.name            
        }];

        updateSelectOptions({...selectOptions, [stateKey]: updatedSelectState});           

        updateSelectedCustomer({value: id, label: entity.name});
        updateInputs({...inputs, [stateKey]: [id]});
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
                        options={selectOptions['customers']} 
                        className="select" 
                        name="customers"
                        value={selectedCustomer}
                        onChange={handleSelectChange}
                        onCreateOption={handleCreateCustomer}                                
                    />
                </div>
                {renderCreateCustomer()}
                <div className="group">
                    <label>Devices:</label>                            
                    <CreatableSelect 
                        options={selectOptions['devices']} 
                        className="select"
                        isMulti
                        name="devices"
                        onChange={handleSelectChange}
                    />                            
                </div>
                <button type="submit">Create</button>
            </StyledForm>
            </div>
        </React.Fragment>
    );
}

export default NewService;