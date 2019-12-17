import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

import { colors, statusEnum, svgIcons } from '../helpers';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';
import { AppContext } from '../AppContext';

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
      
      &--padding { padding: 2rem 1rem; } 
    }

    &--grid  { 
      grid-column: span 2; 
      height: 40rem; }

    &--clickable:hover { cursor: pointer; }
  }
`;

const StyledThumbnail = styled.div`
  display: flex;
  flex: 1;

  .digit {
    flex-basis: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13rem;
    color: ${colors.rdgray}; }
`;

const StyledFrame = styled.div`
  flex-basis: 60%;
  display: flex;
  align-items: center;
  justify-content: center;

    .frame {
      display: flex;
      flex-direction: column;
      width: 60%;
      height: 60%;
      border: 0.1rem solid ${colors.rdgray2};
      border-radius: 0.3rem;

      .header {
        padding: 0.5rem 0.9rem;
        font-size: 1.1rem;
      }

      .body {
        .icon {
          width: 25%;
          margin: 0 0.5rem; 

          svg path { fill: ${props => props.status === statusEnum.COMPLETED ? colors.green : colors.orange}; }
        }

        .label {
          margin: 0 0.5rem; 
          color: ${colors.rdgray};
          font-size: 1.1rem; }
      }
    }
`;

const ScreensDashboard = () => {
  const context = React.useContext(AppContext);

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

  const calculateTotalMonthEarnings = (mainStateServices) => {
    const lastSixMonthsTotals = Array.from({ length: 6 }, () => 0);
    const indexes = generateLastSixMonths().indexes;

    for (const serviceKey of Object.keys(mainStateServices)) {
      const service = mainStateServices[serviceKey];
      const serviceMonth = new Date(service.date).getMonth();

      if (indexes.includes(serviceMonth)) {
        const index = indexes.indexOf(serviceMonth);
        // Additional check becuase empty arrays can not be stored in Firebase
        if (service.actions === '') continue;

        if (service.actions === undefined) return;
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
        data: calculateTotalMonthEarnings(context.state.ssot.services)
      }
    ]
  }

  const renderGrid = () => {
    return (
      <StyledGrid>
        <div
          className="cell cell--clickable"
          onClick={() => goToFilteredServices('history', statusEnum.INPROGRESS)}
        >
          <div className="header">Services in progress</div>
          <div className="body">
            <StyledThumbnail>
              <div className="digit">
                {renderFilteredServicesCount(statusEnum.INPROGRESS, context.state.ssot.services)}
              </div>
              <StyledFrame status={statusEnum.INPROGRESS}>
                <div className="frame">
                  <div className="header">Status</div>
                  <div className="body">
                    <div className="icon" dangerouslySetInnerHTML={{ __html: svgIcons.inProgress }}></div>
                    <div className="label">In Progress</div>
                  </div>
                </div>
              </StyledFrame>
            </StyledThumbnail>
          </div>
        </div>
        <div
          className="cell cell--clickable"
          onClick={() => goToFilteredServices('history', statusEnum.COMPLETED)}
        >
          <div className="header">Completed services</div>
          <div className="body">
            <StyledThumbnail>
              <div className="digit">
                {renderFilteredServicesCount(statusEnum.COMPLETED, context.state.ssot.services)}
              </div>
              <StyledFrame status={statusEnum.COMPLETED}>
                <div className="frame">
                  <div className="header">Status</div>
                  <div className="body">
                    <div className="icon" dangerouslySetInnerHTML={{ __html: svgIcons.completed }}></div>
                    <div className="label">Completed</div>
                  </div>
                </div>
              </StyledFrame>
            </StyledThumbnail>
          </div>
        </div>
        <div className="cell cell--grid">
          <div className="header">Earnings (Last 6 months)</div>
          <div className="body body--padding">
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

  const renderFilteredServicesCount = (status, services) => {
    const servicesCount = Object.keys(services).reduce((total, key) => {
      const service = services[key];

      if (service.status === status) {
        return total + 1;
      } else {
        return total;
      }
    }, 0);

    return String(servicesCount);
  }

  const goToFilteredServices = (navItem, status) => {
    context.setNavActive(navItem);
    context.setFilteredServicesArray([status]);
  }

  return (
    <React.Fragment>
      <Header title="Dashboard" />
      <Body>
          {context.state.loaded && renderGrid()}
      </Body>
    </React.Fragment>
  );
}

export default ScreensDashboard;