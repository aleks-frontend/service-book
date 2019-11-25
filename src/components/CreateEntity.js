import React from 'react';
import styled from 'styled-components';

import Button from './UI/Button';
import { colors, breakpoints } from '../helpers';

const StyledCreateEntity = styled.div`
    position: relative;
    padding: 1.5rem 1.5rem 2.5rem;
    width: 80rem;
    max-width: 100%;
    background: ${colors.lightgray2};
    border-radius: 0.4rem;

    .group {
        border: 1px solid transparent;
        margin-bottom: 0.5rem;

        label { 
            display: block;
            padding: 0.5rem 0.3rem;
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

    .footer { margin-top: 1rem; }
`;

const CreateEntity = (props) => {
    /** Preseting defaultState Object **/
    const defaultState = {};
    for (const field of props.fields) {
        defaultState[field.name] = field.defaultVal;
    }

    defaultState['name'] = props.name;

    for (const fieldName of Object.keys(defaultState)) {
        if (defaultState[fieldName].toString().startsWith('%') && defaultState[fieldName].toString().endsWith('%')) {
            const fieldValue = defaultState[fieldName].toString();
            const tempFieldName = fieldValue.slice(1, -1);

            defaultState[fieldName] = defaultState[tempFieldName];
        }
    }

    const emptyRequiredClassName = 'empty-required';

    /** Setting up the real state **/
    const [state, setState] = React.useState({
        entityState: { ...defaultState },
        emptyRequiredInputs: {}
    });

    /** Event Handler Methods **/
    const handleInputChange = (event) => {
        const entityStateCopy = { ...state.entityState };
        for (const field of props.fields) {
            if (field.calculated && field.calculated.indexOf(event.target.name) > -1) {
                const str = field.calculated.map(item => {
                    return item === event.target.name ? event.target.value : entityStateCopy[item];
                }).join(' ');

                entityStateCopy[field.name] = str;
            }
        }

        entityStateCopy[event.target.name] = event.target.value;
        setState({ ...state, entityState: entityStateCopy });
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const emptyRequiredInputs = {};

        // Checking for empty required fields
        for (const field of props.fields) {
            if (field.required) {
                const isSameAsDefaultVal = state.entityState[field.name] === field.defaultVal;
                const isEmptyString = state.entityState[field.name] === '';
                const isZero = state.entityState[field.name] === 0;

                if (isSameAsDefaultVal || isEmptyString || isZero) {
                    emptyRequiredInputs[field.name] = emptyRequiredClassName;
                } else if (emptyRequiredInputs.hasOwnProperty(field.name)) {
                    delete emptyRequiredInputs[field.name];
                }
            }
        }

        setState({ ...state, emptyRequiredInputs: { ...emptyRequiredInputs } });
        if (Object.keys(emptyRequiredInputs).length) {
            props.showSnackbar('Required field(s) ', 'missing');
            return;
        }

        // Checking if this a regular CreateEntity component 
        // (not the case when we are calling it from NewService)
        if (props.isDirect) {
            const id = new Date().getTime();
            props.addEntity(state.entityState, id, props.stateName);
            props.hidePopup();
            props.showSnackbar(props.stateName, 'created');
            return;
        }

        // Used only in NewService component
        props.addEntity(state.entityState, props.stateName, props.isMulti);
        props.showSnackbar(props.stateName, 'created');
    }

    React.useEffect(() => {
        defaultState['name'] = props.name;
        setState({ ...state, entityState: { ...defaultState } })
    }, [props.name]);

    return (
        <StyledCreateEntity onClick={(e) => e.stopPropagation()}>
            {props.fields.map(field => (
                <div className="group" key={field.name}>
                    <label>{field.required && '* '}{field.label}</label>
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
            <div className="footer">
                <Button
                    type="submit"
                    onClick={handleFormSubmit}
                >Create</Button>
                <Button
                    type="button"
                    onClick={props.hidePopup}
                    isText={true}
                >Cancel</Button>
            </div>
        </StyledCreateEntity>
    );
};

export default CreateEntity;