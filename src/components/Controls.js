import React from 'react';
import styled from 'styled-components';
import SortArrow from './SortArrow';

const StyledControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Controls = (props) => {
    React.useEffect(() => {
        props.updateSortCriteria(sortInputRef.current.value);
    });

    const filterInputRef = React.createRef();  
    const sortInputRef = React.createRef();



    return (
        <StyledControls>
            <SortArrow 
                sortDirectionAsc={props.sortDirectionAsc}
                handleSortDirectionClick={props.handleSortDirectionClick}     
            />
            <select ref={sortInputRef} onChange={() => props.handleSortCriteriaChange(sortInputRef.current.value)}>
                <option value="customers">Customer Name</option>
                <option value="title">Service Title</option>
            </select>
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