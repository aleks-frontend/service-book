import React from 'react';
import styled from 'styled-components';

const StyledArrow = styled.div`
    margin-right: 1rem;
    width: 1rem;
    height: 1rem;
    border: 1rem solid transparent;
    border-top-color: ${(props) => props.sortDirectionAsc ? 'black' : 'transparent'};
    border-bottom-color: ${(props) => props.sortDirectionAsc ? 'transparent' : 'black'};
    transform: ${(props) => props.sortDirectionAsc ? 'translateY(50%)' : 'translateY(-25%)'};

    &:hover { cursor: pointer; }
`;

const SortArrow = (props) => {
    return (
        <StyledArrow 
            sortDirectionAsc={props.sortDirectionAsc} 
            onClick={props.handleSortDirectionClick} />
    );
};

export default SortArrow;