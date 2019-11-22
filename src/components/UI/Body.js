import React from 'react';
import styled from 'styled-components';

const StyledBody = styled.div`
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Body = (props) => {
    return (
        <StyledBody>
            {props.children}
        </StyledBody>
    );
};

export default Body;