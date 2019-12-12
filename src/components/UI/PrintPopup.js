import React from 'react';
import styled from 'styled-components';
import { PDFDownloadLink } from '@react-pdf/renderer';

import Button from './Button';
import PdfDispatchNote from '../PDF/PdfDispatchNote';
import PdfInvoice from '../PDF/PdfInvoice';
import { colors } from '../../helpers';

const StyledPrintPopup = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem;
    width: 40rem;
    max-width: 40rem;
    background: #fff;
    border-radius: 0.3rem;

    .text {
        margin-bottom: 2rem; 
        color: ${colors.rddarkgray}; }

    .buttons {
        display: flex; }
`;

const PrintPopup = (props) => {
    const [state, setState] = React.useState({
        dispatchNotePdfGenerated: false,
        invoicePdfGenerated: false
    });

    const downloadDispatchNotePDF = () => {
        if (state.dispatchNotePdfGenerated) {
            const data = window.URL.createObjectURL(state.pdfDispatchNoteBlob);
            const link = document.createElement('a');
            link.href = data;
            link.download = `dispatch-note-${props.serviceId}.pdf`;
            link.click();
            props.hidePopup();
        }
    }

    const downloadInvoicePDF = () => {
        if (state.invoicePdfGenerated) {
            const data = window.URL.createObjectURL(state.pdfInvoiceBlob);
            const link = document.createElement('a');
            link.href = data;
            link.download = `invoice-${props.serviceId}.pdf`;
            link.click();
            props.hidePopup();
        }
    }    

    const renderDownloadPdfButtons = () => {
        return (
            <React.Fragment>
                <Button
                    type="button"
                    margin="0 0 0 0.5rem"
                    onClick={downloadDispatchNotePDF}
                    disabled={!state.dispatchNotePdfGenerated}
                >
                    {state.dispatchNotePdfGenerated ? 'Dispatch Note' : 'Generating PDF...'}
                </Button>
                <Button
                    type="button"
                    margin="0 0 0 0.5rem"
                    onClick={downloadInvoicePDF}
                    disabled={!state.invoicePdfGenerated}
                >
                    {state.invoicePdfGenerated ? 'Invoice' : 'Generating PDF...'}
                </Button>
                <PDFDownloadLink
                    document={<PdfDispatchNote
                        customerId={props.customerId}
                        deviceIds={props.deviceIds}
                        title={props.title}
                        description={props.description}
                        getDeviceNameById={props.getDeviceNameById}
                        getCustomerObjById={props.getCustomerObjById}
                    />}
                    fileName={`dispatch-note-${props.serviceId}.pdf`}
                >
                    {({ loading, blob }) => {
                        if (!loading && !state.dispatchNotePdfGenerated) {
                            setState({
                                ...state,
                                pdfDispatchNoteBlob: blob,
                                dispatchNotePdfGenerated: true
                            });
                        }
                    }}
                </PDFDownloadLink>
                <PDFDownloadLink
                    document={<PdfInvoice
                        serviceId={props.serviceId}
                        customerId={props.customerId}
                        title={props.title}
                        actions={props.actions}
                        remark={props.remark}
                        newDevices={props.newDevices}
                        getCustomerObjById={props.getCustomerObjById}
                        getActionNameById={props.getActionNameById}
                        getDeviceNameById={props.getDeviceNameById}
                    />}
                    fileName={`dispatch-note-${props.serviceId}.pdf`}
                >
                    {({ loading, blob }) => {
                        if (!loading && !state.invoicePdfGenerated) {
                            setState({
                                ...state,
                                pdfInvoiceBlob: blob,
                                invoicePdfGenerated: true
                            });
                        }
                    }}
                </PDFDownloadLink>
            </React.Fragment>
        )
    }

    return (
        <StyledPrintPopup onClick={(e) => e.stopPropagation()}>
            <div className="text">What document do you want to print?</div>
            <div className="buttons">
                {renderDownloadPdfButtons()}
            </div>
        </StyledPrintPopup>
    );
};

export default PrintPopup;