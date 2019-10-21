import React from 'react';
import styled from 'styled-components';

const StyledSide = styled.div`
    width: 200px;
    color: #fff;
    background: #313442;
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