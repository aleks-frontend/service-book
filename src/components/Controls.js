import React from 'react';
import styled from 'styled-components';
import SortArrow from './SortArrow';
import { colors } from '../helpers';

const StyledControls = styled.div`
    display: flex;
    justify-content: space-between;

    .sort {
        display: flex;
        align-items: center;
        padding: 0.5rem 1rem;
        margin-right: 1rem;
        border: 1px solid ${colors.lightgray};
        border-radius: 0.4rem;

        label {
            margin-right: 1rem;
            font-size: 1.2rem;
            color: ${colors.gray} }
    }

    input[type="text"] {
        padding: 0 0.5rem;
        border-radius: 0.3rem;
        border: 1px solid ${colors.lightgray};
    }
`;

const Controls = (props) => {
    React.useEffect(() => {
        props.updateSortCriteria(sortInputRef.current.value);
    });

    const filterInputRef = React.createRef();  
    const sortInputRef = React.createRef();

    return (
        <StyledControls>
            <div className="sort">
                <label>Sort by: </label>
                <select 
                    ref={sortInputRef} 
                    onChange={() => props.handleSortCriteriaChange(sortInputRef.current.value)}
                >
                    <option value="date">Date</option>
                    <option value="customers">Customer Name</option>
                    <option value="title">Service Title</option>
                </select>
                <SortArrow 
                    sortDirectionAsc={props.sortDirectionAsc}
                    handleSortDirectionClick={props.handleSortDirectionClick}     
                />
            </div>
            <input 
            type="text" 
            placeholder="Filter" 
            ref={filterInputRef} 
            onChange={() => props.handleSearchInputChange(filterInputRef.current.value)} 
            />
        </StyledControls>
    );
};

export default Controls;