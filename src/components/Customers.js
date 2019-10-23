import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from './Header';
import Body from './Body';

const StyledTable = styled.div`
  background: #fff;

  .heading {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const Customers = (props) => {
  return (
    <React.Fragment>
      <Header title="Customers" />
      <Body>
        <StyledTable>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="heading">Name</TableCell>
                <TableCell className="heading" align="right">Email</TableCell>
                <TableCell className="heading" align="right">Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {Object.keys(props.customers).map((key => {
                const customer = props.customers[key];
                return (
                  <TableRow key={key}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell align="right">{customer.email}</TableCell>
                    <TableCell align="right">{customer.phone}</TableCell>
                  </TableRow>
                );
            }))}
            </TableBody>
          </Table>
        </StyledTable>
      </Body>
    </React.Fragment>
  );
}

export default Customers;