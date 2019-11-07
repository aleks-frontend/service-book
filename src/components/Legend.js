import React from 'react';
import styled from 'styled-components';

import { colors } from '../helpers';

const StyledLegend = styled.div`
    display: flex;
    margin-bottom: 2rem;
`;

const StyledLegenItem = styled.div`
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
                return props.colors.yellow;
            } else if (props.status === 'completed') {
                return props.colors.green;
            } else {
                return props.colors.orange;
            }
        }};
    }

    .legend__label { font-size: 1.3rem; }
`;

const Legend = () => {
    return (
        <StyledLegend>
            <StyledLegenItem colors={colors} status="received">
                <div className="legend__indicator"></div>
                <div className="legend__label">Received</div>
            </StyledLegenItem>
            <StyledLegenItem colors={colors} status="in progress">
                <div className="legend__indicator"></div>
                <div className="legend__label">In Progress</div>
            </StyledLegenItem>
            <StyledLegenItem colors={colors} status="completed">
                <div className="legend__indicator"></div>
                <div className="legend__label">Completed</div>
            </StyledLegenItem>
        </StyledLegend>
    );
};

export default Legend;