import React from 'react';
import styled from 'styled-components';
import Header from './Header';

const StyledCustomer = styled.div`
    margin-bottom: 1rem;
`;

const Customers = (props) => {
  return (
    <React.Fragment>
      <Header title="Customers" />
      <div className="body">
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
      </div>
    </React.Fragment>
  );
}

export default Customers;