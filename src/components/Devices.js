import React from 'react';
import styled from 'styled-components';

const DevicesContainer = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 3rem;

    .device {
        &::before {
            content: '|';
            font-size: 1rem;
            margin: 0 0.5rem;
        }

        &:last-child {
            &::after {
                content: '|';
                margin-left: 0.5rem;
            }
        }

        &--ellipsis { 
            font-size: 0;

            &::after { display: none; }
        }

        &--hidden {
            display: none;

            & + .device--ellipsis { font-size: 1rem; }
        }
    }
`;

const Devices = (props) => {
    const { devices, getDeviceById } = props;

    return (
        <DevicesContainer>
            {devices
                .map((id, index) => (
                    <div className={(index > 3) ? "device device--hidden" : "device"} key={id}>
                        {getDeviceById(id)}
                    </div>
                    )
                )
            }
            <div className="device device--ellipsis">...</div>
        </DevicesContainer>
    );
};

export default Devices;