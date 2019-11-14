import React from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    background-color: #000;    
    .logo {
        max-width: 80%;
        max-height: 60%;
    }
`;

const Logo = () => {
    return (
        <LogoContainer>
            <img className="logo" src="./logo-landscape.svg" alt="Logo" />
        </LogoContainer>
    );
}

export default Logo;
