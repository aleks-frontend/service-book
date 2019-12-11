import React from 'react';
import styled from 'styled-components';

import { svgIcons, colors } from '../../helpers';

const StyledIconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 0.5rem;
    padding: 0;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-radius: 0.3rem;
    opacity: 0.8;
    transition: 0.3s all;

    &:hover { 
        cursor: pointer;
        opacity: 1; }
    &:focus { outline: none; }

    svg { 
        height: 100%; 

        path { fill: ${colors.rddarkgray}; }
    }
`;

const IconButton = (props) => {
    const renderButtonIcon = () => {
        switch (props.icon) {
            case 'delete':
                return svgIcons.delete;
            case 'update':
                return svgIcons.update;
            case 'expand':
                return svgIcons.expand;
            case 'print':
                return svgIcons.print;
            default:
                return svgIcons.delete;
        }
    }
    return (
        <StyledIconButton
            type="button"
            onClick={props.onClick}
            dangerouslySetInnerHTML={{ __html: renderButtonIcon() }} />
    );
};

export default IconButton;