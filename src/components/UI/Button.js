import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers';

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    height: 3rem;
    padding: 0 3.5rem;
    color: ${props => props.isText ? colors.dpblue :  '#fff'};
    background: ${props => props.isText ? 'transparent' :  colors.dpblue};
    border: none;
    border-radius: 0.3rem;
    text-transform: uppercase;
    box-shadow: ${props => props.isText ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.25)'}; 

    &:hover { cursor: pointer; }
    &:focus { outline: none; }
`;

const Button = (props) => {
    return (
        <StyledButton 
            isText={props.isText}
            onClick={props.onClick}
            type={props.type}
        >
            {props.children}
        </StyledButton>
    );
};

export default Button;
