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
            padding: 0 1rem;

            &.empty-required {
                border-color: red; }

            &:read-only {
                color: gray;
                background-color: #e3e3e3;
                border-color: gray;

                &:hover {
                    cursor: default; }
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

    for ( const fieldName of Object.keys(defaultState) ) {
        if ( defaultState[fieldName].toString().startsWith('%') && defaultState[fieldName].toString().endsWith('%') ) {
            const fieldValue = defaultState[fieldName].toString();
            const tempFieldName = fieldValue.slice(1, -1);

            defaultState[fieldName] = defaultState[tempFieldName];
        }
    }
    
    const emptyRequiredClassName = 'empty-required';

    const [ state, setState ] = React.useState({
        entityState: { ...defaultState },
        emptyRequiredInputs: {}
    });

    const handleInputChange = (event) => {
        const entityStateCopy = {...state.entityState};
        for ( const field of props.fields) {
            if ( field.calculated && field.calculated.indexOf(event.target.name) > -1 ) {
                const str = field.calculated.map(item => {
                    return item === event.target.name ? event.target.value : entityStateCopy[item];
                }).join(' ');
                
                entityStateCopy[field.name] = str;
            }
        }

        entityStateCopy[event.target.name] = event.target.value;
        setState({...state, entityState: entityStateCopy});
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const emptyRequiredInputs = {};

        // Checking for empty required fields
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
        if ( Object.keys(emptyRequiredInputs).length ) return;

        // Checking if this a regular CreateEntity component 
        // (not the case when we are calling it from NewService)
        if ( props.isDirect ) {
            const id = new Date().getTime();
            props.addEntity(state.entityState, id, props.stateName);
            props.hidePopup();
            props.showSnackbar(props.stateName, 'created');
            return;
        }

        // Used only in NewService component
        props.addEntity(state.entityState, props.stateName, props.isMulti);
        props.hideCreateEntityForm(props.stateName);
        props.showSnackbar(props.stateName, 'created');
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
                        readOnly={field.calculated ? true : false}
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