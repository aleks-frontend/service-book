import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { colors, statusEnum, svgIcons } from '../helpers';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20rem auto;
  grid-gap: 2rem;
  width: 800px;
  max-width: 100%;

  .cell {  
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #fff;
    border-radius: 0.4rem;

    .header {
      padding: 1rem;
      font-size: 2rem;
      color: #fff;
      background: ${colors.rdgray2}; }
      
    .body { 
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      font-size: 13rem;
      color: ${colors.rdgray}; }

    &--grid  { 
      grid-column: span 2; 
      height: 40rem; }

    &--clickable:hover { cursor: pointer; }
  }


  
`;

const ScreensDashboard = (props) => {
  const generateLastSixMonths = () => {
    let currentMonth = new Date().getMonth();
    const lastSixMonths = [];
    const lastSixMonthsNames = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (let i = 0; i < 6; i++) {
      if (currentMonth < 0) currentMonth = 11;
      lastSixMonths.push(currentMonth);
      lastSixMonthsNames.push(monthNames[currentMonth]);
      currentMonth--;
    }

    return { names: lastSixMonthsNames.reverse(), indexes: lastSixMonths.reverse() };
  }

  const calculateTotalMonthEarnings = () => {
    const lastSixMonthsTotals = Array.from({ length: 6 }, () => 0);
    const indexes = generateLastSixMonths().indexes;

    for (const serviceKey of Object.keys(props.services)) {
      const service = props.services[serviceKey];
      const serviceMonth = new Date(service.date).getMonth();

      if (indexes.includes(serviceMonth)) {
        const index = indexes.indexOf(serviceMonth);
        // Additional check becuase empty arrays can not be stored in Firebase
        if (service.actions === '') continue;

        const totalServicePrice = service.actions.reduce((total, action) => {
          return total + parseInt(action.price);
        }, 0);

        lastSixMonthsTotals[index] += totalServicePrice;
      }
    }

    lastSixMonthsTotals.push(0);

    return lastSixMonthsTotals;
  }

  const data = {
    labels: [...generateLastSixMonths().names],
    datasets: [
      {
        label: 'Earnings per month',
        backgroundColor: colors.rdblue,
        borderColor: colors.rddarkgray,
        borderWidth: 1,
        hoverBackgroundColor: colors.rdgray2,
        hoverBorderColor: colors.rddarkgray,
        data: calculateTotalMonthEarnings()
      }
    ]
  };

  const renderGrid = () => {
    return (
      <StyledGrid>
        <div
          className="cell cell--clickable"
          onClick={() => goToFilteredServices('history', statusEnum.INPROGRESS)}
        >
          <div className="header">Services in progress</div>
          <div className="body">
            {renderFilteredServicesCount(statusEnum.INPROGRESS)}
          </div>
        </div>
        <div
          className="cell cell--clickable"
          onClick={() => goToFilteredServices('history', statusEnum.COMPLETED)}
        >
          <div className="header">Services ready for delivery</div>
          <div className="body">
            {renderFilteredServicesCount(statusEnum.COMPLETED)}
          </div>
        </div>
        <div className="cell cell--grid">
          <div className="header">Earnings (Last 6 months)</div>
          <div className="body">
            <Bar
              data={data}
              legend={null}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </StyledGrid>
    );
  }

  const renderFilteredServicesCount = (status) => {
    const servicesCount = Object.keys(props.services).reduce((total, key) => {
      const service = props.services[key];

      if (service.status === status) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);

    return String(servicesCount);
  }

  const goToFilteredServices = (navItem, status) => {
    props.setNavActive(navItem);
    props.setFilteredServicesArray([status]);
  }

  return (
    <React.Fragment>
      <Header title="Dashboard" />
      <Body>
        {props.mainStateIsLoaded && renderGrid()}
      </Body>
    </React.Fragment>
  );
}

export default ScreensDashboard;