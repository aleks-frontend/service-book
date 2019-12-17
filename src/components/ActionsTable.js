import React from 'react';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';

import Button from './UI/Button.js'
import { AppContext } from '../AppContext';
import { colors } from '../helpers';

const StyledActionsTable = styled.div`
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

const StyledActionsTableCell = styled.div`
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
    border: ${props => props.header ? 'none' : `1px solid ${colors.lightgray}`};
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

const ActionsTable = (props) => {
    const context = React.useContext(AppContext);
    const { actions: appActions } = context.state.ssot;
    
    const [state, setState] = React.useState({
        actionRows: (props.actions.value === "") ? [] : props.actions.value,
    });    

    /** State control methods **/
    const addActionRow = () => {
        const actionRow = {
            rowId: new Date().getTime(),
            actionId: "",
            quantity: 1,
            price: 0
        };

        setState({...state, actionRows: [
            ...state.actionRows,
            actionRow
        ]});
    }

    const updateActionRowState = (rowId, value, key, isPriceUpdated=false) => {
        const actionRowsStateCopy = [ ...state.actionRows ];
        
        for ( const actionRowsStateCopyItem of actionRowsStateCopy ) {
            if ( Number(actionRowsStateCopyItem.rowId) === Number(rowId) ) {
                actionRowsStateCopyItem[key] = value;
                // Checking if we selected the exisitng action
                // Preseting the price in this case
                if ( isPriceUpdated ) {
                    actionRowsStateCopyItem.price = appActions[value].price;
                }
                break;
            }
        }

        setState({...state, actionRows: actionRowsStateCopy});

        // Validating rows and sending to ServiceForm
        validateAndSendToServiceForm(actionRowsStateCopy);
    }

    const validateAndSendToServiceForm = (actionRowsStateCopy) => {
        let validatedActionRows = actionRowsStateCopy.filter(actionRow => ( 
            actionRow.actionId !== "" && actionRow.quantity !== "" && actionRow.price !== "" )
        );

        props.updateServiceFormActionsState(validatedActionRows);        
    }

    /** Event Handler Methods **/
    const handleDropdownChange = (event, actionMeta) => {
        const rowId = actionMeta.name;
        const value = event.value;
        
        updateActionRowState(rowId, value, 'actionId', true);
    }

    const handleInputChange = (event) => {
        const rowId = event.target.getAttribute('actionrowid');
        const value = event.target.value;
        const key = event.target.name;

        updateActionRowState(rowId, value, key);
    }

    const handleInputFocus = (event) => event.target.select();

    const handleCreateAction = (event) => {
        const actionId = String(new Date().getTime());
        const rowId = state.actionRows[state.actionRows.length - 1].rowId;

        context.addEntity({name: event, price: 0}, actionId, 'actions');
        updateActionRowState(rowId, actionId, 'actionId');
    }

    const handleXClick = (rowId) => {
        const actionRowsStateCopy = [ ...state.actionRows ].filter(row => row.rowId !== rowId);

        setState({...state, actionRows: actionRowsStateCopy});
        // Validating rows and sending to ServiceForm
        validateAndSendToServiceForm(actionRowsStateCopy);
    }

    /** Render Methods **/
    const renderTableHeder = () => {
        if (state.actionRows.length) {
            return (
                <React.Fragment>
                    <div className="headerBg"></div>
                    <StyledActionsTableCell header={true} col={1}>Name</StyledActionsTableCell>
                    <StyledActionsTableCell 
                        header={true} 
                        col={2}
                    >
                        Quantity
                    </StyledActionsTableCell>
                    <StyledActionsTableCell header={true} col={3}>Price</StyledActionsTableCell>
                </React.Fragment>
            );
        }
    }

    const renderRows = () => {
        if ( state.actionRows.length === 0 ) return null;

        return state.actionRows.map((actionRow, index) => {
            return (
                <React.Fragment key={actionRow.rowId}>
                    <CreatableSelect
                        options={Object.keys(appActions).map(key => ({
                            value: key,
                            label: appActions[key].name
                        }))}
                        className="select"
                        name={actionRow.rowId}
                        value={actionRow.actionId !== '' ? {
                            value: actionRow.actionId,
                            label: appActions[actionRow.actionId].name
                        } : ''}
                        onChange={handleDropdownChange}
                        onCreateOption={handleCreateAction}                        
                        isValidNewOption={(inputValue) => {
                            if ( inputValue !== "" && index === state.actionRows.length - 1 ) {
                                return true;
                            }
                        }}
                        tabSelectsValue={false}
                    />
                    <StyledActionsTableCell col={2}>
                        <input 
                            actionrowid={actionRow.rowId}
                            value={actionRow.quantity} 
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="number"
                            name="quantity"
                        />
                    </StyledActionsTableCell>
                    <StyledActionsTableCell col={3}>
                        $<input                          
                            actionrowid={actionRow.rowId}
                            value={actionRow.price} 
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            type="number"
                            name="price"
                        />
                        <div 
                            className="closex"
                            onClick={() => handleXClick(actionRow.rowId)}
                        >x</div>
                    </StyledActionsTableCell>
                </React.Fragment>
            );
        })
    }

    const renderTotal = () => {
        if ( !state.actionRows ) return null;
        
        return state.actionRows.reduce((total, row) => {
            return total + Number(row.price * row.quantity);
        }, 0);
    }

    return (
        <StyledActionsTable>
            {renderTableHeder()}
            {renderRows()}
            <div className="footer">
                <Button 
                    onClick={addActionRow}
                    type="button"
                >Add Action</Button>
                <div className="total">Total: {renderTotal()}</div>
            </div>
        </StyledActionsTable>
    );
};

export default ActionsTable;