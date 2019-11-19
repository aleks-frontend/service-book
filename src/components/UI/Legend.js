import React from 'react';
import styled from 'styled-components';

import { colors, svgIcons } from '../../helpers';

const StyledLegend = styled.div`
    display: flex;
`;

const StyledLegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
    transition: 0.3s all;

    &:hover { 
        cursor: pointer; 

        .legend__indicator svg path { fill: ${colors.rdblue}; }
        .legend__label { color: ${colors.rdblue}; }
    }

    .legend__indicator {
        margin-right: 0.5rem;
        width: 3.3rem;
        height: 3.3rem; 
    
        svg path { 
            fill: ${props => props.selected ? colors.rdblue : colors.rddarkgray}; 
            transition: 0.3s all; }
    }

    .legend__label { 
        font-size: 1.2rem; 
        color: ${props => props.selected ? colors.rdblue : colors.rddarkgray}; 
        transition: 0.3s all; }
`;

const Legend = () => {
    return (
        <StyledLegend>
            <StyledLegendItem colors={colors} status="received" selected={true}>
                <div className="legend__indicator" dangerouslySetInnerHTML={{ __html: svgIcons.received }}></div>
                <div className="legend__label">Received</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="in progress">
                <div className="legend__indicator" dangerouslySetInnerHTML={{ __html: svgIcons.inProgress }}></div>
                <div className="legend__label">In Progress</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="completed">
                <div className="legend__indicator" dangerouslySetInnerHTML={{ __html: svgIcons.completed }}></div>
                <div className="legend__label">Completed</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="shipped">
                <div className="legend__indicator" dangerouslySetInnerHTML={{ __html: svgIcons.shipped }}></div>
                <div className="legend__label">Shipped</div>
            </StyledLegendItem>
        </StyledLegend>
    );
};

export default Legend;