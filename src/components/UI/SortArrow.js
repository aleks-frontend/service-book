import React from 'react';
import styled from 'styled-components';

const StyledArrow = styled.div`
    margin-left: 1rem;
    width: 2rem;
    height: 3.4rem;
    background: url('arrow-icon.png') no-repeat center;
    background-size: contain;
    transform: rotate(${props => props.sortDirectionAsc ? '0deg' : '180deg'});
    transition: 0.3s all;

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