import React, { useState, useEffect, createRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Devices from './Devices';

const ServicesContainer = styled.div`
  .service {
    padding: 1rem;
    margin-bottom: 2rem;
    border: 1px solid #000;
    background: #fff;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input[type="text"] {
        margin-left: 1rem;
        padding: 0.5rem;
        border: none; }
    }

    &__body {
      flex: 1;
      display: flex; }

    &__text {
      font-size: 1.3rem;

      &--alt { 
        font-size: 0.9em; 
        font-weight: 700; }
    }

    &__footer { 
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
  }

  .controls {
    display: flex;
    align-items: center; }

  .sortArrow {
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    border: 1rem solid transparent;
    border-top-color: black;
    transform: translateY(25%);

    &:hover { cursor: pointer; }
    
    &--desc {
      border-top-color: transparent;
      border-bottom-color: black;
      transform: translateY(-25%); }

  }
`

const History = (props) => {
  const [ searchText, updateSearchText ] = useState('');
  const [ sortCriteria, updateSortCriteria ] = useState('');
  const [ sortDirectionAsc, updateSortDirectionAsc ] = useState(true);
  const {services, getCustomerNameById, getDeviceById, extendHistoryItem, filterServices, sortServices} = props;
  const filterInput = createRef();  
  const sortInput = createRef();
  const sortDirectionInput = createRef();
  let searchTimeout;

  useEffect(() => {
    updateSortCriteria(sortInput.current.value);
  });
  
  const handleSearchInputChange = () => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
      updateSearchText(filterInput.current.value);      
    }, 500);    
  }

  const handleSortCriteriaChange = () => {
    updateSortCriteria(sortInput.current.value);
  }

  const handleSortDirectionClick = () => {
    updateSortDirectionAsc(!sortDirectionAsc);
  }

  const renderServices = () => {
    if ( sortCriteria === '' ) return;
    const filteredArr = [];
    
    for ( const serviceKey of Object.keys(services) ) {
      if ( filterServices(services[serviceKey], searchText)) {
        filteredArr.push(serviceKey);
      }
    }

    const sortedArr = sortServices(filteredArr, sortCriteria, sortDirectionAsc);

    return sortedArr.map(key => renderService(services[key], key));
  }

  const renderService = (service, key) => (
    <div 
      className="service"
      key={key}            
    >
      <div className="service__body">
        <div className="service__section">
          <div className="service__text">{service.description}</div>
          <div className="service__text service__text--alt">
            {getCustomerNameById(service.customers.length ? service.customers[0] : '')}
          </div>
        </div>
        <Devices devices={service.devices} getDeviceById={getDeviceById} />
        <div className="service__side">
          <div className="service__date">{service.date}</div>
          <div className="service__status">{service.status}</div>  
        </div>
        <button 
          className="service__btn"
          onClick={() => extendHistoryItem(key)}
          >{service.extended ? 'Show Less' : 'Show more'}</button>
      </div>
      <CSSTransition 
        in={service.extended} 
        timeout={500} 
        classNames="display"
        unmountOnExit
        appear
      >
        <div className="service__footer">
          Nulla consequat massa quis enim. Curabitur nisi. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. In auctor lobortis lacus. Ut a nisl id ante tempus hendrerit.
          Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Etiam ultricies nisi vel augue.
        </div>
      </CSSTransition>
    </div>
  );

  return (
    <React.Fragment>
      <ServicesContainer>
        <div className="service__header">
          <h1>Services History</h1>
          <div className="controls">
            <div className={sortDirectionAsc ? "sortArrow" : "sortArrow sortArrow--desc"} ref={sortDirectionInput} onClick={handleSortDirectionClick}></div>
            <select ref={sortInput} onChange={handleSortCriteriaChange}>
              <option value="customers">Customer Name</option>
              <option value="description">Description</option>
            </select>
            <input type="text" placeholder="Filter" ref={filterInput} onChange={handleSearchInputChange} />
          </div>
        </div>
        {renderServices()}
      </ServicesContainer>
    </React.Fragment>
  );
}

export default History;