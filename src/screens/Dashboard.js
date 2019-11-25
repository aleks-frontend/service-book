import React from 'react';
import { Bar } from 'react-chartjs-2';

import { colors } from '../helpers';
import Header from '../components/UI/Header';
import Body from '../components/UI/Body';


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
    
    for ( const serviceKey of Object.keys(props.services) ) {      
      const service = props.services[serviceKey];
      const serviceMonth = new Date(service.date).getMonth();

      if ( indexes.includes(serviceMonth) ) {
        const index = indexes.indexOf(serviceMonth);
        // Additional check becuase empty arrays can not be stored in Firebase
        if ( service.actions === '' ) continue;
        
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

  const renderBar = () => {
    return (
      <Bar
          data={data}
          options={{
            maintainAspectRatio: false
          }}
        />
    );
  }

  return (
    <React.Fragment>
      <Header title="Dashboard" />
      <Body>
        <div style={
          {
            width: 500,
            height: 300
          }
        }>
          {props.mainStateIsLoaded && renderBar()}          
        </div>
      </Body>
    </React.Fragment>
  );
}

export default ScreensDashboard;