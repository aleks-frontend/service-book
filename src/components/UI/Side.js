import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers';

const StyledSide = styled.div`
    flex-shrink: 0;
    width: 200px;
    color: #fff;
    background: ${colors.dpgray};
    text-align: center;
`;

const Side = (props) => {
    return (
        <StyledSide>
            {props.children}
        </StyledSide>
    );
};

export default Side;