import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem;
    height: 80px;
    font-size: 2rem;
    background-color: #fff;
`;

const Header = () => {
    return (
        <StyledHeader>Header</StyledHeader>
    );
}

export default Header;
