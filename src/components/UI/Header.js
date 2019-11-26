import React from 'react';
import styled from 'styled-components';

import { colors, dpLogo } from '../../helpers'

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 2rem 2rem 0;
    height: 8rem;
    color: ${colors.rdlightgray};
    font-size: 2.5rem;
    background-color: ${colors.rdgray};

    .logo { width: 11rem;
        svg { width: 100%; }
    }
`;

const Header = (props) => {
    return (
        <StyledHeader>
            {props.title}
            <div className="logo" dangerouslySetInnerHTML={{ __html: dpLogo }}></div>
        </StyledHeader>
    );
}

export default Header;
