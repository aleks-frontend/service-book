import React from 'react';
import styled from 'styled-components';

const StyledSpinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img { display: block; }
`;

const LoadingSpinner = () => {
    return (
        <StyledSpinner>
            <img src="/loading-spinner.gif" alt="Spinner" />
        </StyledSpinner>
    );
}

export default LoadingSpinner;