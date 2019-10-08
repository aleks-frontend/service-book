import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.div`
    margin-top: ${props => props.marginTop}rem;

    .nav__item {        
        display: flex;
        align-items: center;
        padding: 1.5rem 2rem;
    }

    .nav__icon {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
    }
`;

const navItems = [
    {
        text: "Home",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png"
    },
    {
        text: "History",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png"
    },
    {
        text: "Customers",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png"
    },
    {
        text: "Actions",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png"
    }
];

const Nav = (props) => {    
    return (
        <StyledNav marginTop={props.marginTop}>
            {navItems.map((item, index) => (
                    <div className="nav__item" key={`key-${index}`}>
                        <img className="nav__icon" src={item.icon} alt={item.text} />
                        <div className="nav__text">{item.text}</div>
                    </div>    
                )
            )}
        </StyledNav>
    );
}

export default Nav;
