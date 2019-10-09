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

class Nav extends React.Component {
    state = {
        navItems: {
            home: {
                text: "Home",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/',
                active: false
            },
            history: {
                text: "History",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/history',
                active: false
            },
            customers: {
                text: "Customers",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/customers',
                active: false
            },
            actions: {
                text: "Actions",
                icon: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/dashboard-alt-icon.png",
                url: '/actions',
                active: false
            }
        }
    }

    componentDidMount() {
        this.setActive();    
    }

    changeUrl = (key, e) => {
        e.preventDefault();
        this.props.history.push(this.state.navItems[key].url);        
    };

    setActive = () => {
        const pathname = this.props.history.location.pathname;
        let activeItem = pathname.split('/')[1];
        const navItems = {...this.state.navItems};

        // Reseting active property on previous element
        Object.keys(navItems).map(key => navItems[key].active = false);
        
        if ( activeItem === '' ) activeItem = 'home';        

        navItems[activeItem].active = true;
        this.setState({ navItems });
    }
    
    render() {
        return (
            <StyledNav margin={this.props.margin}>
                {Object.keys(this.state.navItems).map((key) => (
                        <a 
                            href="#" 
                            className={(this.state.navItems[key].active) ? 'nav__item nav__item--active' : 'nav__item'} 
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
