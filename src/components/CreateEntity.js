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

        label { 
            margin-right: 1rem;
            min-width: 4rem; }
        
        input[type="text"] {
            flex: 1; 

            &.empty-required {
                border-color: red;
            }
        }
    }
`;

const StyledWarning = styled.div`
    margin-bottom: 1rem;
    color: red;
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

const Warning = (props) => (
    <StyledWarning>
        {props.children}
    </StyledWarning>
);

const CreateEntity = (props) => {
    const defaultState = {};
    for ( const field of props.fields ) {
        defaultState[field.name] = field.defaultVal;
    }
    
    defaultState['name'] = props.name;
    const emptyRequiredClassName = 'empty-required';

    const [ state, setState ] = React.useState({
        entityState: { ...defaultState },
        emptyRequiredInputs: {}
    });

    const handleInputChange = (event) => {
        setState({...state, entityState: {
            ...state['entityState'],
            [event.target.name]: event.target.value
        }});
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if ( props.isDirect ) {
            const emptyRequiredInputs = {};
            for ( const field of props.fields ) {
                if ( field.required ) {
                    if ( state.entityState[field.name] === field.defaultVal ) {
                        emptyRequiredInputs[field.name] = emptyRequiredClassName;
                    } else if (emptyRequiredInputs.hasOwnProperty(field.name)) {
                        delete emptyRequiredInputs[field.name];
                    }
                }
            }

            setState({...state, emptyRequiredInputs: {...emptyRequiredInputs}});

            if ( Object.keys(emptyRequiredInputs).length ) {
                return;
            }
            
            const id = new Date().getTime();
            props.addEntity(state.entityState, id, props.stateName);
            props.hidePopup();
            return;
        }
        // Used only in NewService component
        props.addEntity(state.entityState, props.stateName, props.isMulti);
    }

    const renderWarning = () => {
        if ( Object.keys(state.emptyRequiredInputs).length ) {
            return (
                <Warning>You are missing required input(s)!</Warning>
            );
        }
    }
    
    React.useEffect(() => {
        defaultState['name'] = props.name;
        setState({...state, entityState: {...defaultState}})
    }, [props.name]);

    return (
        <StyledCreateEntity onClick={(e) => e.stopPropagation()}>
            {renderWarning()}
            {props.fields.map(field => (
                <div className="group" key={field.name}>
                    <label>{field.label}</label>
                    <input 
                        type="text" 
                        name={field.name} 
                        required={field.required}
                        value={state.entityState[field.name]} 
                        onChange={handleInputChange}
                        className={state.emptyRequiredInputs[field.name] ? state.emptyRequiredInputs[field.name] : ''}
                    />
                </div>    
            ))}
            <button type="submit" onClick={handleFormSubmit}>Create</button>
        </StyledCreateEntity>
    );
};

export default CreateEntity;