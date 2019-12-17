import React from 'react';
import styled from 'styled-components';

import CreateEntity from './CreateEntity';
import Popup from './UI/Popup';
import Button from './UI/Button.js'
import { colors } from '../helpers';
import { AppContext } from '../AppContext';

const StyledNewDevicesTable = styled.div`
    display: grid;
    grid-template-columns: 1fr minmax(5rem, 10rem) minmax(5rem, 10rem);
    grid-gap: 0.5rem;
    padding: 1.5rem 2.5rem 1.5rem 1.5rem;
    width: 100%;
    border: 1px solid ${colors.lightgray};
    border-radius: 0.4rem;

    .headerBg {
        background: ${colors.dpgray};
        grid-row: 1;
        grid-column: 1 / -1;
        border-radius: 0.3rem; }

    .footer {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 0.5rem;

        .button {
            border: none;
            display: flex;
            align-items: center;
            height: 3rem;
            padding: 0 3.5rem;
            color: #fff;
            background: ${colors.dpblue};
            border-radius: 0.3rem;
            text-transform: uppercase;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25); 
            
            &:hover { cursor: pointer; }
        }

        .total { font-weight: 700; }
    }
`;

const StyledNewDevicesTableCell = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => (props.header) ? 'grid-row: 1' : ''};;
    ${props => {
        if (props.header) {
            if (props.col === 1) {
                return (
                    'grid-column: 1; justify-content: flex-start;'
                )
            } else if (props.col === 2) {
                return 'grid-column: 2';
            } else {
                return 'grid-column: 3';
            }
        }
    }}
    padding: 0.8rem 1rem;
    font-size: 1.2rem;
    font-weight: ${props => props.header ? '700' : '400'};
    color: ${props => props.header ? '#fff' : '#000'};
    background: ${props => props.header ? 'transparent' : '#fff'};
    border: ${props => props.header ? 'none' : props.alerted ?  '2px solid red' : `1px solid ${colors.lightgray}`};
    border-radius: 0.3rem;
    text-align: ${props => (props.col === 1) ? 'left' : 'center'};

    input[type="number"] {
        max-width: 100%;
        height: 3.4rem;
        border: none; }

    .closex {
        position: absolute;
        padding: 0 0.5rem;
        right: 0;
        font-size: 1.5rem;
        font-weight: 700;
        transform: translateX(100%);
        opacity: 0;
        transition: 0.3s all;

        &:hover { cursor: pointer; }
    }

    &:hover .closex { opacity: 1; }
`;

const NewDevicesTable = (props) => {
    const context = React.useContext(AppContext);
    const { devices: appDevices } = context.state.ssot;

    const [state, setState] = React.useState({
        newDeviceRows: (props.newDevices.value === "") ? [] : props.newDevices.value,
        showPopup: false
    });

    /** State control methods **/
    const addNewDeviceRow = (id, entity) => {
        const newDeviceRow = {
            rowId: id,
            deviceId: id,
            deviceName: entity.name,
            quantity: 1,
            price: 0
        };

        setState({
            ...state, newDeviceRows: [
                ...state.newDeviceRows,
                newDeviceRow
            ], showPopup: false
        });

        // Here we show the create device popup form
        // On submit of the form, we will call the handleCreateNewDevice()
    }

    const updateNewDeviceRowsState = (rowId, value, key) => {
        const newDeviceRowsStateCopy = [...state.newDeviceRows];

        for (const newDeviceRowsStateCopyItem of newDeviceRowsStateCopy) {
            if (Number(newDeviceRowsStateCopyItem.rowId) === Number(rowId)) {
                newDeviceRowsStateCopyItem[key] = value;
                break;
            }
        }

        setState({ ...state, newDeviceRows: newDeviceRowsStateCopy });

        // Validating rows and sending to ServiceForm
        validateAndSendToServiceForm(newDeviceRowsStateCopy);
    }

    const validateAndSendToServiceForm = (newDeviceRowsStateCopy) => {
        let validatedNewDeviceRows = newDeviceRowsStateCopy.filter(newDeviceRow => (
            newDeviceRow.deviceId !== "" && newDeviceRow.quantity !== "" && newDeviceRow.price !== "")
        );

        props.updateServiceFormNewDevicesState(validatedNewDeviceRows);
    }

    /** Helper method for adding the new entity to the local state **/
    const addEntityToLocalState = (entity, stateKey) => {
        const id = String(new Date().getTime());
        
        context.addEntity(entity, id, stateKey, true); // final parameter is true for 'isNewDevice'
        addNewDeviceRow(id, entity);
    }

    /** Event Handler Methods **/

    const handleInputChange = (event) => {
        const rowId = event.target.getAttribute('newdevicesrowid');
        const value = event.target.value;
        const key = event.target.name;

        updateNewDeviceRowsState(rowId, value, key);
    }

    const handleInputFocus = (event) => event.target.select();

    const handleXClick = (rowId) => {
        const newDeviceRowsStateCopy = [...state.newDeviceRows].filter(row => row.rowId !== rowId);

        setState({ ...state, newDeviceRows: newDeviceRowsStateCopy });
        // Validating rows and sending to ServiceForm
        validateAndSendToServiceForm(newDeviceRowsStateCopy);
    }

    const hidePopup = () => setState({ ...state, showPopup: false });
    const showPopup = () => setState({ ...state, showPopup: true });

    /** Render Methods **/
    const renderTableHeader = () => {
        if (state.newDeviceRows.length) {
            return (
                <React.Fragment>
                    <div className="headerBg"></div>
                    <StyledNewDevicesTableCell header={true} col={1}>Name</StyledNewDevicesTableCell>
                    <StyledNewDevicesTableCell
                        header={true}
                        col={2}
                    >
                        Quantity
                    </StyledNewDevicesTableCell>
                    <StyledNewDevicesTableCell header={true} col={3}>Price</StyledNewDevicesTableCell>
                </React.Fragment>
            );
        }
    }

    const renderRows = () => {
        if (state.newDeviceRows.length === 0) return null;

        return state.newDeviceRows.map(newDeviceRow => {
            return (
                <React.Fragment key={newDeviceRow.rowId}>
                    <StyledNewDevicesTableCell col={1}>
                        <input
                            newdevicesrowid={newDeviceRow.rowId}
                            value={(appDevices[newDeviceRow.deviceId] === undefined) ? newDeviceRow.deviceName : context.getDeviceNameById(newDeviceRow.deviceId)}
                            onChange={handleInputChange}
                            type="text"
                            name="deviceId"
                            readOnly={true}
                        />
                    </StyledNewDevicesTableCell>
                    <StyledNewDevicesTableCell 
                        col={2} 
                        alerted={newDeviceRow.quantity === '0' || newDeviceRow.quantity === ''}
                    >
                        <input
                            newdevicesrowid={newDeviceRow.rowId}
                            value={newDeviceRow.quantity}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="number"
                            name="quantity"
                        />
                    </StyledNewDevicesTableCell>
                    <StyledNewDevicesTableCell 
                        col={3} 
                        alerted={newDeviceRow.price === '0' || newDeviceRow.price === 0 || newDeviceRow.price === ''}
                    >
                        $<input
                            newdevicesrowid={newDeviceRow.rowId}
                            value={newDeviceRow.price}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="number"
                            name="price"
                        />
                        <div
                            className="closex"
                            onClick={() => handleXClick(newDeviceRow.rowId)}
                        >x</div>
                    </StyledNewDevicesTableCell>
                </React.Fragment>
            );
        })
    }

    const renderTotal = () => {
        if (!state.newDeviceRows) return null;

        return state.newDeviceRows.reduce((total, row) => {
            return total + Number(row.price * row.quantity);
        }, 0);
    }

    const renderCreateNewDevicePopup = () => {
        if (!state.showPopup) {
            return null;
        }
        return (
            <React.Fragment>
                <Popup hidePopup={hidePopup}>
                    <CreateEntity
                        name=""
                        addEntity={addEntityToLocalState}
                        stateName="devices"
                        fields={props.fields}
                        isNewDevice={true}
                        showSnackbar={props.showSnackbar}
                        hidePopup={hidePopup}
                    />
                </Popup>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <StyledNewDevicesTable>
                {renderTableHeader()}
                {renderRows()}
                <div className="footer">
                    <Button
                        onClick={showPopup}
                        type="button"
                    >Add New Device</Button>
                    <div className="total">Total: {renderTotal()}</div>
                </div>
            </StyledNewDevicesTable>
            {renderCreateNewDevicePopup()}
        </React.Fragment>
    );
};

export default NewDevicesTable;