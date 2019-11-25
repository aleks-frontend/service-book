import React from 'react';
import styled from 'styled-components';

const StyledTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 2rem;
    width: 100%;
`;

const TopBar = (props) => {
    return (
        <StyledTopBar>
            {props.children}
        </StyledTopBar>
    );
};

export default TopBar;