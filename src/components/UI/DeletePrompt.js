import React from 'react';
import styled from 'styled-components';

import Button from './Button';
import { colors } from '../../helpers';
import { AppContext } from '../../AppContext';

const StyledDeletePrompt = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);
    z-index: 2;

    .box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 4rem 1rem;
        width: 33rem;
        background: #fff;
        border-radius: 0.3rem;

        .text {
            margin-bottom: 2rem; 
            color: ${colors.rddarkgray}; }
    }
`;

const DeletePrompt = (props) => {
    const context = React.useContext(AppContext);

    return (
        <StyledDeletePrompt onClick={() => props.updatePromptedId(null)}>
            <div className="box" onClick={(e) => e.stopPropagation()}>
                <div className="text">Are you sure you want to delete this service?</div>
                <div className="buttons">
                    <Button
                        onClick={() => {
                            context.deleteService(props.id);
                            props.updatePromptedId(null);
                        }}
                        type="button"
                        margin="0 0.5rem"
                    >Yes
                    </Button>
                    <Button
                        onClick={() => props.updatePromptedId(null)}
                        isText={true}
                        type="button"
                        margin="0 0.5rem"
                    >No
                    </Button>
                </div>
            </div>
        </StyledDeletePrompt>
    );
};

export default DeletePrompt;
