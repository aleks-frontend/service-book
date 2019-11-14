import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers';

const StyledLegend = styled.div`
    display: flex;
    margin-bottom: 2rem;
`;

const StyledLegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-right: 2rem;

    .legend__indicator {
        margin-right: 0.5rem;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: ${ props => {
            if (props.status === 'received') {
                return colors.yellow;
            } else if (props.status === 'completed') {
                return colors.green;
            } else if (props.status === 'shipped') {
                return colors.purple;
            } else {
                return colors.orange;
            }
        }};
    }

    .legend__label { font-size: 1.3rem; }
`;

const Legend = () => {
    return (
        <StyledLegend>
            <StyledLegendItem colors={colors} status="received">
                <div className="legend__indicator"></div>
                <div className="legend__label">Received</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="in progress">
                <div className="legend__indicator"></div>
                <div className="legend__label">In Progress</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="completed">
                <div className="legend__indicator"></div>
                <div className="legend__label">Completed</div>
            </StyledLegendItem>
            <StyledLegendItem colors={colors} status="shipped">
                <div className="legend__indicator"></div>
                <div className="legend__label">Shipped</div>
            </StyledLegendItem>
        </StyledLegend>
    );
};

export default Legend;