import React from 'react';
import styled from 'styled-components';

const StyledPopup = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0, 0.6);
    z-index: 9999;    
`;

const Popup = (props) => {
    return (
        <StyledPopup onClick={() => props.hidePopup()}>
            {props.children}
        </StyledPopup>
    );
};

export default Popup;