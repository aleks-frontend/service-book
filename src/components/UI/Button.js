import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers';

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    margin: ${props => props.margin ? props.margin : '0'};
    padding: ${props => props.compact ? '0 2rem' : '0 3.5rem'};
    height: ${props => props.compact ? '2.5rem' : '3rem'};
    color: ${props => props.isText ? colors.rdgray2 :  '#fff'};
    background: ${props => props.isText ? 'transparent' :  colors.rdgray2};
    border: none;
    border-radius: 0.3rem;
    box-shadow: ${props => props.isText ? 'none' : '0px 2px 4px rgba(0, 0, 0, 0.25)'}; 

    &:hover { cursor: pointer; }
    &:focus { outline: none; }
    &:disabled { 
        opacity: 0.8;
        cursor: default; }

    a { 
        color: ${props => props.isText ? colors.rdgray2 :  '#fff'}; 
        text-decoration: none; }
`;

const Button = (props) => {
    return (
        <StyledButton 
            isText={props.isText}
            onClick={props.onClick}
            type={props.type}
            compact={props.compact}
            margin={props.margin}
            disabled={props.disabled}
        >
            {props.children}
        </StyledButton>
    );
};

export default Button;
