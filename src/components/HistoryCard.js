import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import { colors } from '../helpers';
import color from '@material-ui/core/colors/green';

const StyledHistoryCard = styled.div`
    display: flex;
    flex-direction: column;
    grid-row: ${props => props.extended ? 'span 2' : 'auto'};
    padding: 2rem;
    background: #fff;
    box-shadow: 0px 4px 4px rgba(0,0,0,0.25);

    &.card-appear-active {
        opacity: 0;
        transform: scale(0, 0);
    }

    &.card-appear-done {
        transition: 0.5s all;
        opacity: 1;
        transform: scale(1, 1);
    }

    &.card-exit {
        opacity: 1;
        transform: scale(1, 1);
    }

    &.card-exit-active {
        transition: 0.5s all;
        opacity: 0;
        transform: scale(0, 0);
    }

    .header {
        display: flex;
        align-items: center;
        padding-bottom: 1.5rem;
        margin-bottom: 2rem;
        border-bottom: ${`1px solid ${colors.gray}`};

        .indicator {
            flex-shrink: 0;
            width: 4.3rem;
            height: 4.3rem;
            border-radius: 50%;
            background: ${props => {
                if (props.status === 'received') {
                    return colors.yellow;
                } else if (props.status === 'completed') {
                    return colors.green;
                } else if (props.status === 'shipped') {
                    return colors.purple;
                } else {
                    return colors.orange;
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
                color: ${colors.gray}; }
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
                color: ${colors.gray}; }
        }
    }

    .footer {
        display: flex;

        button {
            margin-right: 2.5rem;
            padding: 0;
            font-size: 1.8rem;
            font-weight: 700;
            color: ${colors.dpblue};
            border: none;
            background: transparent;
            text-transform: uppercase;

            &:hover { cursor: pointer; }
            &:focus { outline: 0; }
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

const StyledActions = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 2rem;
    margin-top: 1rem;
    padding-top: 1rem;
    font-size: 1.3rem;
    color: #000;
    border-top: 1px solid ${colors.gray};
    
    .name { margin-bottom: 0.5rem; }
    
    .quantity {
        font-size: 1.1rem;
        color: ${colors.gray}; }

    .price { 
        text-align: right; 

        &--total {
            font-size: 1.5rem;
        }
    }
    
    .divider {
        grid-column: 1 / -1;
        height: 1px;
        background-color: ${colors.gray}; }

    .total {
        font-size: 1.5rem;
        color: ${colors.gray}; 
        text-transform: uppercase; }
`;

const HistoryCard = (props) => {
    const { getCustomerNameById, getDeviceById, getActionNameById, service, id } = props;
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

    const renderActions = () => {
        return (
            <StyledActions>
                {renderActionsRows()}
                {renderActionsFooter()}
            </StyledActions>
        )
    }

    const renderActionsRows = () => {
        return (
            service.actions.map(action => {
                return (                    
                    <React.Fragment key={action.rowId}>
                    <div className="text">
                        <div className="name">{getActionNameById(action.actionId)}</div>
                        <div className="quantity">quantity: {action.quantity}</div>
                    </div>
                    <div className="price">$ {action.price * action.quantity}</div>
                    </React.Fragment>
                )
            })
        )
    }

    const renderActionsFooter = () => {
        const total = service.actions.reduce((total, action) => {
            return total + action.quantity * action.price;
        }, 0);

        return (
            <React.Fragment>
                <div className="divider"></div>
                <div className="total">Total</div>
                <div className="price price--total">$ {total}</div>
            </React.Fragment>
        );
    }

    return (
        <StyledHistoryCard status={service.status} extended={extended}>
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
                    <React.Fragment>
                        <div className="block">
                            <div className="heading">Remarks</div>
                            <div className="content">{service.remark}</div>
                        </div>
                        <div className="block">
                            <div className="heading">Actions and pricing</div>
                            <div className="content">
                                {service.actions ? renderActions() : 'No actions added yet.'}
                            </div>
                        </div>
                    </React.Fragment>
                </CSSTransition>
            </div>
            <div className="footer">
                <button onClick={() => props.showPopup(id)}>Update</button>
                <button onClick={() => props.updatePromptedId(id)}>Delete</button>
                <button onClick={extendHistoryItem}>{extended ? 'Collapse' : 'Expand'}</button>
            </div>
        </StyledHistoryCard>
    );
};

export default HistoryCard;