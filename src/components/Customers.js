import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Body from './Body';

const StyledCustomer = styled.div`
    margin-bottom: 1rem;
`;

const Customers = (props) => {
  return (
    <React.Fragment>
      <Header title="Customers" />
      <Body>
          {Object.keys(props.customers).map((key => {
              const customer = props.customers[key];
              return (
                <StyledCustomer key={key}>
                    <div><strong>Name:</strong> {customer.name}</div>
                    <div><strong>Email:</strong> {customer.email}</div>
                    <div><strong>Phone:</strong> {customer.phone}</div>
                </StyledCustomer>
              );
          }))}
      </Body>
    </React.Fragment>
  );
}

export default Customers;