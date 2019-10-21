import React from 'react';
import styled from 'styled-components';

const StyledCreateEntity = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background: #e3e3e3;
    
    .group {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        height: 2rem;

        label { 
            margin-right: 1rem;
            min-width: 4rem; }
        
        input[type="text"] {
            flex: 1; }
    }
`;

// fields = [
//     {
//         name: 'name',
//         label: 'Name',
//         type: 'text'
//     },
//     {
//         name: 'phone',
//         label: 'Phone',
//         type: 'text'
//     },
//     {
//         name: 'email',
//         label: 'Email',
//         type: 'text'
//     }
// ]

const CreateEntity = (props) => {
    const defaultState = {};
    for ( const field of props.fields ) {
        defaultState[field.name] = field.defaultVal;
    }
    
    defaultState['name'] = props.name;

    const [ entityState, updateEntityState ] = React.useState({...defaultState});

    const handleInputChange = (event) => {
        updateEntityState({...entityState, [event.target.name]: event.target.value});
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addEntity(entityState, props.stateName, props.isMulti);
    }
    
    return (
        <StyledCreateEntity>
            {props.fields.map(field => (
                <div className="group" key={field.name}>
                    <label>{field.label}</label>
                    <input type="text" name={field.name} value={entityState[field.name]} onChange={handleInputChange} />
                </div>    
            ))}
            <button type="submit" onClick={handleFormSubmit}>Create</button>
        </StyledCreateEntity>
    );
};

export default CreateEntity;