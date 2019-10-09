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
    }

    .nav__icon {
        width: 2.5rem;
        height: 2.5rem;
        margin-right: 1rem;
    }
`;

class Nav extends React.Component {
    state = {
        navItems: {
            home: {
                text: "Home",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/'
            },
            history: {
                text: "History",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/history'
            },
            customers: {
                text: "Customers",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/customers'
            },
            actions: {
                text: "Actions",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/actions'
            }
        }
    }

    changeUrl = (key, e) => {
        e.preventDefault();
        this.props.history.push(this.state.navItems[key].url);
    };
    
    render() {
        return (
            <StyledNav margin={this.props.margin}>
                {Object.keys(this.state.navItems).map((key) => (
                        <a 
                            href="#" 
                            className="nav__item" 
                            key={key}
                            onClick={(e) => this.changeUrl(key, e)}
                        >
                            <img 
                                className="nav__icon" 
                                src={this.state.navItems[key].icon} 
                                alt={this.state.navItems[key].text} 
                            />
                            <div className="nav__text">{this.state.navItems[key].text}</div>
                        </a>    
                    )
                )}
            </StyledNav>
        );
    }
}

export default Nav;
