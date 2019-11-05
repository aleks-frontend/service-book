import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Devices from './Devices';

const StyledHistoryCard = styled.div`
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #000;
    background: #fff;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input[type="text"] {
        margin-left: 1rem;
        padding: 0.5rem;
        border: none; }
    }

    .body {
      flex: 1;
      display: flex; }

    .text {
      font-size: 1.3rem;

      &--alt { font-size: 0.9em; }
    }

    .footer { 
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
    const { getCustomerNameById, getDeviceById, service, id } = props;
    const [ extended, updateExtended ] = React.useState(false);     

    const extendHistoryItem = () => updateExtended(!extended);    

    return (
        <StyledHistoryCard>
            <div className="body">
              <div className="section">
                  <div className="text"><strong>{service.title}</strong></div>
                  <div className="text text--alt">
                  {getCustomerNameById(service.customers.length ? service.customers[0] : '')}
                  </div>
              </div>
              <Devices devices={service.devices} getDeviceById={getDeviceById} />
              <div className="side">
                  <div className="date">{new Date(service.date).toLocaleDateString()}</div>
                  <div className="status">{service.status}</div>  
              </div>
              <button 
                className="btn"
                onClick={extendHistoryItem}
                >{extended ? 'Show Less' : 'Show more'}</button>
                <button 
                  className="btn"
                  onClick={() => props.updatePromptedId(id)}
                >Delete</button>                         
                <button 
                  className="btn"
                >Update</button>
            </div>
            <CSSTransition 
                in={extended} 
                timeout={500} 
                classNames="display"
                unmountOnExit
                appear
            >
            <div className="footer">
                {service.description}
            </div>
            </CSSTransition>
        </StyledHistoryCard>
    );
};

export default HistoryCard;