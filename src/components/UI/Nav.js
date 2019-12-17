import React from 'react';
import styled from 'styled-components';

import { AppContext } from '../../AppContext';
import { colors } from '../../helpers';
import { svgIcons } from '../../helpers';

const StyledNav = styled.div`
    margin-top: 8rem;
    
    .nav__item {        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem 0;
        color: ${colors.rdlightgray};
        transition: 0.3s all;
        &:hover { 
            cursor: pointer; 
            color: ${colors.rdblue};

            svg path, 
            svg polygon, 
            svg ellipse,
            svg line,
            svg rect { stroke: ${colors.rdblue}; }
        }

        &--active { 
            color: ${colors.rdblue}; 

            svg path, 
            svg polygon, 
            svg ellipse,
            svg line,
            svg rect { stroke: ${colors.rdblue}; }
        }

        svg path, 
        svg polygon,
        svg ellipse,
        svg line,
        svg rect { transition: 0.3s all; }
    }

    .nav__icon { 
        margin-bottom: 0.5rem;
        width: 3.5rem; 
        
        svg { width: 100%; }
    }

    .nav__text {
        font-size: 1.1rem;
        font-weight: 700;        
        text-align: center;
        text-decoration: none;
    }
`;

const navItems = {
    home: {
        text: "Home",
        icon: svgIcons.home,
        iconActive: "/icons/home-icon-active.svg",
    },
    newService: {
        text: "New Service",
        icon: svgIcons.newService,
        iconActive: "/icons/new-service-icon-active.svg",
    },
    history: {
        text: "History",
        icon: svgIcons.history,
        iconActive: "/icons/history-icon-active.svg",
    },
    customers: {
        text: "Customers",
        icon: svgIcons.customers,
        iconActive: "/icons/customers-icon-active.svg",
    },
    actions: {
        text: "Actions",
        icon: svgIcons.actions,
        iconActive: "/icons/actions-icon-active.svg",
    },
    devices: {
        text: "Devices",
        icon: svgIcons.devices,
        iconActive: "/icons/devices-icon-active.svg",
    }
};

class Nav extends React.Component {
    render(props) {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <StyledNav>
                            {Object.keys(navItems).map((key) => (
                                <div
                                    className={(context.state.activeNavItemKey === key) ? 'nav__item nav__item--active' : 'nav__item'}
                                    key={key}
                                    onClick={(e) => context.setNavActive(key)}
                                >
                                    <div className="nav__icon" dangerouslySetInnerHTML={{ __html: navItems[key].icon }}></div>
                                    <div className="nav__text">{navItems[key].text}</div>
                                </div>
                            )
                            )}
                        </StyledNav>
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        );
    }
}

export default Nav;
