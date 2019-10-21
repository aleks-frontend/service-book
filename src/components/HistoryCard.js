import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Devices from './Devices';

const StyledHistoryCard = styled.div`
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #000;
    background: #fff;

    .historyCard__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input[type="text"] {
        margin-left: 1rem;
        padding: 0.5rem;
        border: none; }
    }

    .historyCard__body {
      flex: 1;
      display: flex; }

    .historyCard__text {
      font-size: 1.3rem;

      &--alt { 
        font-size: 0.9em; 
        font-weight: 700; }
    }

    .historyCard__footer { 
      opacity: 0;
      max-height: 0;
      transition: all 500ms;
      padding-top: 1rem;
      margin-top: 2rem;
      border-top: 1px solid #e3e3e3; }

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
    const { getCustomerNameById, getDeviceById, service } = props;
    const [ extended, updateExtended ] = React.useState(false);

    const extendHistoryItem = () => updateExtended(!extended);

    return (
        <StyledHistoryCard>
            <div className="historyCard__body">
            <div className="historyCard__section">
                <div className="historyCard__text">{service.title}</div>
                <div className="historyCard__text service__text--alt">
                {getCustomerNameById(service.customers.length ? service.customers[0] : '')}
                </div>
            </div>
            <Devices devices={service.devices} getDeviceById={getDeviceById} />
            <div className="historyCard__side">
                <div className="historyCard__date">{new Date(service.date).toLocaleDateString()}</div>
                <div className="historyCard__status">{service.status}</div>  
            </div>
            <button 
                className="historyCard__btn"
                onClick={() => extendHistoryItem()}
                >{extended ? 'Show Less' : 'Show more'}</button>
            </div>
            <CSSTransition 
                in={extended} 
                timeout={500} 
                classNames="display"
                unmountOnExit
                appear
            >
            <div className="historyCard__footer">
                Nulla consequat massa quis enim. Curabitur nisi. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. In auctor lobortis lacus. Ut a nisl id ante tempus hendrerit.
                Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Etiam ultricies nisi vel augue.
            </div>
            </CSSTransition>
        </StyledHistoryCard>
    );
};

export default HistoryCard;