import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { colors } from '../helpers';

const StyledHistoryCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    margin-bottom: 2rem;
    margin-left: 2rem;
    width: calc(50% - 2rem);
    height: 38rem;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);
    max-width: 44rem;

    .header {
        display: flex;
        align-items: center;
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
        border-bottom: ${(props) => `1px solid ${props.colors.gray}`};

        .indicator {
            width: 4.3rem;
            height: 4.3rem;
            border-radius: 50%;
            background: ${props => {
        if (props.status === 'received') {
            return props.colors.yellow;
        } else if (props.status === 'completed') {
            return props.colors.green;
        } else {
            return props.colors.orange;
        }
    }}
        }

        .text {
            margin-left: 1.5rem;

            .heading {
                margin-bottom: 0.9rem;
                font-size: 1.8rem;
                font-weight: 700; }

            .subheading { 
                font-size: 1.5rem; 
                color: ${props => props.colors.gray}; }
        }
    }

    .body {       
        flex: 1;
        overflow: auto;

        .block {
            margin-bottom: 1.5rem;

            .heading { 
                font-size: 1.5rem;
                margin-bottom: 0.5rem; }
            
            .content {
                font-size: 1.3rem;
                color: ${props => props.colors.gray}; }
        }
    }

    .footer {
        display: flex;

        button {
            margin-right: 2.5rem;
            padding: 0;
            font-size: 1.8rem;
            font-weight: 700;
            color: ${props => props.colors.dpblue};
            border: none;
            background: transparent;
            text-transform: uppercase;

            &:hover { cursor: pointer; }
        }
    }

    .display-enter {
        opacity: 0;
        max-height: 0; }

    .display-enter-active,
    .display-enter-done {
        opacity: 1;
        max-height: 600px;
        transition: all 500ms; }

    .display-exit {
        opacity: 1;
        max-height: 600px; }

    .display-exit-active {
        opacity: 0;
        max-height: 0;
        transition: all 500ms; }
`;

const HistoryCard = (props) => {
    const { getCustomerNameById, getDeviceById, service, id } = props;
    const [extended, updateExtended] = React.useState(false);

    const extendHistoryItem = () => updateExtended(!extended);

    const renderDevices = () => {
        return (
            service.devices.map((id, index) => {
                const coma = (index < service.devices.length - 1) ? ', ' : '';
                return `${getDeviceById(id)}${coma}`;
            })
        );
    }

    return (
        <StyledHistoryCard colors={colors} status={service.status}>
            <div className="header">
                <div className="indicator"></div>
                <div className="text">
                    <div className="heading">{service.title}</div>
                    <div className="subheading">
                        {getCustomerNameById(service.customers.length ? service.customers[0] : '')}
                    </div>
                </div>
            </div>
            <div className="body">
                <div className="block">
                    <div className="heading">Description</div>
                    <div className="content">{service.description}</div>
                </div>
                <div className="block">
                    <div className="heading">Devices</div>
                    <div className="content">
                        {renderDevices()}
                    </div>
                </div>
                <div className="block">
                    <div className="heading">Date</div>
                    <div className="content">
                        {new Date(service.date).toLocaleDateString()}
                    </div>
                </div>
                <CSSTransition
                    in={extended}
                    timeout={500}
                    classNames="display"
                    unmountOnExit
                    appear
                >
                    <div className="block">
                        <div className="heading">Description</div>
                        <div className="content">{service.description}</div>
                    </div>
                </CSSTransition>
            </div>
            <div className="footer">
                <button>Update</button>
                <button onClick={() => props.updatePromptedId(id)}>Delete</button>
                <button onClick={extendHistoryItem}>{extended ? 'Collapse' : 'Expand'}</button>
            </div>
        </StyledHistoryCard>
    );
};

export default HistoryCard;