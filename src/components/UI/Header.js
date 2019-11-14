import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    height: 80px;
    font-size: 2rem;
    background-color: #fff;
`;

const Header = (props) => {
    return (
        <StyledHeader>
            {props.title}
            {props.children}
        </StyledHeader>
    );
}

export default Header;
