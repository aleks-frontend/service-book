import React, { useState } from 'react';

import Header from './Header';
import Body from './Body';
import HistoryCard from './HistoryCard';
import Controls from './Controls';
import DeletePrompt from './DeletePrompt';

const History = (props) => {
  const [ searchText, updateSearchText ] = useState('');
  const [ sortCriteria, updateSortCriteria ] = useState('');
  const [ sortDirectionAsc, updateSortDirectionAsc ] = useState(true);
  const [ promptedId, updatePromptedId ] = React.useState(null);
  const {
    services,
    getCustomerNameById, 
    getDeviceById, 
    filterServices, 
    sortServices,
    deleteService
  } = props;  
  let searchTimeout;
  let sortedArr;  
  
  const handleSearchInputChange = (value) => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
      updateSearchText(value);      
    }, 500);    
  }

  const handleSortCriteriaChange = (value) => {
    updateSortCriteria(value);
  }

  const handleSortDirectionClick = () => {
    updateSortDirectionAsc(!sortDirectionAsc);
  }

  const renderServices = () => {
    if ( sortCriteria === '' ) return;
    const filteredArr = [];
    
    // First we filter services and populate filteredArr with keys
    for ( const serviceKey of Object.keys(services) ) {
      if ( filterServices(services[serviceKey], searchText)) {
        filteredArr.push(serviceKey);
      }
    }

    // After filtering, we are sorting the array
    sortedArr = sortServices(filteredArr, sortCriteria, sortDirectionAsc);
    return sortedArr.map(key => renderService(services[key], key));
  }

  const renderService = (service, key) => (
    <HistoryCard 
      key={key} 
      id={key}
      service={service} 
      getCustomerNameById={getCustomerNameById} 
      getDeviceById={getDeviceById}
      deleteService={deleteService}
      updatePromptedId={updatePromptedId}
    />
  );

  const renderDeletePrompt = () => {
    if ( promptedId ) {
      return (
        <DeletePrompt 
          id={promptedId} 
          deleteService={deleteService} 
          updatePromptedId={updatePromptedId}
        />);
    }      
  }

  return (
    <React.Fragment>
      {renderDeletePrompt()}
      <Header title="Services History">
        <Controls 
          handleSearchInputChange={handleSearchInputChange} 
          handleSortCriteriaChange={handleSortCriteriaChange}
          handleSortDirectionClick={handleSortDirectionClick} 
          updateSortCriteria={updateSortCriteria}
          sortDirectionAsc={sortDirectionAsc}
        />
      </Header>
      <Body>
        {renderServices()}
      </Body>
    </React.Fragment>
  );
}

export default History;