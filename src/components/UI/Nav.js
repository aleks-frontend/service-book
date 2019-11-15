import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.div`
    margin: ${props => props.margin};
    
    .nav__item {        
        display: flex;
        align-items: center;
        padding: 1.5rem 2rem;
        color: #fff;
        text-decoration: none;
        transition: 0.3s all;
        &:hover { 
            cursor: pointer; 
            background: rgba(0,0,0, 0.5);
        }

        &--active {
            background: #000;
        }
    }

    .nav__icon {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
    }
`;

const navItems = {
    home: {
        text: "Home",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    },
    newService: {
        text: "New Service",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    },
    history: {
        text: "History",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    },
    customers: {
        text: "Customers",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    },
    actions: {
        text: "Actions",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    },
    devices: {
        text: "Devices",
        icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
    }
};

class Nav extends React.Component {
    render() {
        return (
            <React.Fragment>
            <StyledNav margin={this.props.margin}>
                {Object.keys(navItems).map((key) => (
                    <div
                        className={(this.props.activeNavItemKey === key) ? 'nav__item nav__item--active' : 'nav__item'} 
                        key={key}
                        onClick={(e) => this.props.setNavActive(key)}
                    >
                        <img 
                            className="nav__icon" 
                            src={navItems[key].icon} 
                            alt={navItems[key].text} 
                        />
                        <div className="nav__text">{navItems[key].text}</div>
                    </div>    
                    )
                )}
            </StyledNav>
            </React.Fragment>
        );
    }
}

export default Nav;
