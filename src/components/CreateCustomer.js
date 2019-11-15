import React from 'react';
import styled from 'styled-components';

const StyledCreateEntity = styled.div`
    margin-bottom: 1rem;
    padding: 1rem;
    background: #e3e3e3;
    
    .group {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        height: 2rem;

        label { 
            margin-right: 1rem;
            min-width: 4rem; }
        
        input[type="text"] {
            flex: 1; }
    }
`;

const CreateCustomer = (props) => {
    /** Setting up the state **/
    const [ customer, updateCustomer ] = React.useState({
        name: props.name,
        phone: "",
        email: ""
    });

    /** Event Handler Methods **/
    const handleInputChange = (event) => {
        updateCustomer({...customer, [event.target.name]: event.target.value});
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        props.addCustomer(customer);
    }
    
    return (
        <StyledCreateEntity>
            <div className="group">
                <label>Name:</label>
                <input type="text" name="name" value={customer.name} onChange={handleInputChange} />
            </div>
            <div className="group">
                <label>Email:</label>
                <input type="text" name="email" value={customer.email} onChange={handleInputChange} />
            </div>
            <div className="group">
                <label>Phone:</label>
                <input type="text" name="phone" value={customer.phone} onChange={handleInputChange} />
            </div>
            <button type="submit" onClick={handleFormSubmit}>Create user</button>
        </StyledCreateEntity>
    );
};

export default CreateCustomer;