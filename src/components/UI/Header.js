import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers'

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2rem 2rem 0;
    height: 8rem;
    color: ${colors.rdlightgray};
    font-size: 2.5rem;
    background-color: ${colors.rdgray};

    .logo { 
        height: 5rem;
        
        img { 
            height: 100%; 
            width: auto;
        }
    }
`;

const Header = (props) => {
    return (
        <StyledHeader>
            {props.title}
            <div className="logo">
                <img src="/img/gg-logo-cropped.png" />
            </div>
        </StyledHeader>
    );
}

export default Header;
