import React from 'react';
import styled from 'styled-components';

const StyledDeletePrompt = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.5);

    .box {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 35rem;
        height: 20rem;
        background: #fff;

        .text {
            margin-bottom: 2rem; }

        .buttons {
            button {
                margin: 0 0.5rem;
                padding: 0.5rem 2rem;
                border: 1px solid #e3e3e3;
                border-radius: 3px;
                
                &.alt { background: #e3e3e3; }
                &:hover { cursor: pointer; }
            }
        }
    }
`;

const DeletePrompt = (props) => {
    return (
        <StyledDeletePrompt onClick={() => props.updatePromptedId(null)}>
            <div className="box" onClick={(e) => e.stopPropagation()}>
                <div className="text">Are you sure you want to delete this service?</div>
                <div className="buttons">
                    <button 
                        onClick={() => {
                            props.deleteService(props.id);
                            props.updatePromptedId(null);
                        }}
                    >Yes</button>
                    <button 
                        className="alt"
                        onClick={() => props.updatePromptedId(null)}
                    >No</button>
                </div>
            </div>
        </StyledDeletePrompt>
    );
};

export default DeletePrompt;