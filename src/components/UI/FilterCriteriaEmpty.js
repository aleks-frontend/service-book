import React from 'react';
import styled from 'styled-components';

import { colors } from '../../helpers';

const StyledFilterCriteriaEmpty = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 2rem;
	color: ${colors.rdgray2};
`;

const FilterCriteriaEmpty = (props) => {
    return (
        <StyledFilterCriteriaEmpty>
            {props.children}
        </StyledFilterCriteriaEmpty>
    );
};

export default FilterCriteriaEmpty;