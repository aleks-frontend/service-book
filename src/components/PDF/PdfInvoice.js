import React from 'react';
import { Document, Page, View, Image, Text, StyleSheet, Font } from '@react-pdf/renderer';

import { colors } from '../../helpers';

Font.register({
    family: 'Roboto-Bold',
    weight: '700',
    src: '/fonts/Roboto-Bold.ttf'
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        color: colors.rddarkgray
    },
    heading: {
        marginBottom: 20,
        fontSize: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingBottom: 20,
    },
    headerText: {
        flex: 1,
        fontSize: 12,
        fontFamily: 'Roboto-Bold'
    },
    companyInfo: {
        flex: 1,
        borderTop: 2,
        borderTopColor: colors.rdlightgray
    },
    companyInfoText: {
        display: 'block',
        marginBottom: 1,
        fontSize: 10,
        lineHeight: '1em'
    },
    logo: {
        display: 'block',
        marginLeft: 5,
        width: 100
    },
    boxContainer: {
        flexDirection: 'row',
    },
    box: {
        flex: 1,
        flexDirection: 'column'
    },
    boxHeader: {
        padding: 5,
        backgroundColor: colors.rddarkgray,
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Roboto-Bold'
    },
    boxBody: {
        flex: 1,
        padding: 5,
        border: 1,
        borderColor: colors.rddarkgray
    },
    boxText: {
        fontSize: 10,
    },
    customerInfoGroup: {
        flexDirection: 'row',
        marginBottom: 5,
        fontSize: 10
    },
    customerInfoLabel: {
        fontFamily: 'Roboto-Bold'
    },
    serviceGroup: {
        marginBottom: 10,
        fontSize: 0
    },
    serviceLabel: {
        padding: 5,
        fontSize: 13,
        color: '#000',
        backgroundColor: colors.rdlightgray,
    },
    serviceText: {
        padding: '10px 5px',
        border: 1,
        fontSize: 10,
        color: colors.rddarkgray,
        borderColor: colors.rdlightgray
    },
    devicesText: {
        flexDirection: 'row',
        marginBottom: 5
    },
    devicesName: {
        fontSize: 10,
        letterSpacing: 1
    },
    devicesSerial: {
        fontSize: 8
    },
    table: {
        marginTop: 10,
        borderLeft: 1,
        borderRight: 1,
        borderLeftColor: colors.rdlightgray,
        borderRightColor: colors.rdlightgray,
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: "center",
        paddingBottom: 6,
        paddingTop: 6,
        paddingLeft: 5,
        borderBottom: 1,
        borderBottomColor: colors.rdlightgray
    },
    tableHeader: {
        flexDirection: 'row',
        height: 30,
        alignItems: "center",
        paddingLeft: 5,
        backgroundColor: colors.rdlightgray,
    },
    tableHeaderCell: {
        fontSize: 10,
        fontFamily: 'Roboto-Bold',
        color: '#000'
    },
    tableCell: {
        fontSize: 10,
        color: colors.rddarkgray,
    },
    total: {
        flexDirection: 'row',
        height: 30,
        alignItems: "center",
        marginTop: 10,
        paddingLeft: 5,
        backgroundColor: colors.rddarkgray
    },
    totalCell: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        color: '#fff',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
    },
    signature: {
        paddingTop: 10,
        width: '40%',
        borderTop: 1,
        borderBottomColor: colors.rddarkgray
    },
    signatureName: {
        fontSize: 12,
        fontFamily: 'Roboto-Bold',
        textAlign: 'left',
        color: colors.rdgray
    }
});

const modifiers = StyleSheet.create({
    serviceTextDescription: {
        ...styles.serviceText,
        height: 150
    },
    companyInfoTextMain: {
        ...styles.companyInfoText,
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        marginBottom: 2,
        marginTop: 2
    },
    tableCellLABEL: {
        ...styles.tableCell,
        width: '70%'
    },
    tableCellFULL: {
        ...styles.tableCell,
        width: '100%',
        lineHeight: 1.2
    },
    tableCellQUANTITY: {
        ...styles.tableCell,
        width: '10%'
    },
    tableCellPRICE: {
        ...styles.tableCell,
        width: '10%'
    },
    tableHeaderCellLABEL: {
        ...styles.tableHeaderCell,
        width: '70%',
    },
    tableHeaderCellQUANTITY: {
        ...styles.tableHeaderCell,
        width: '10%'
    },
    tableHeaderCellPRICE: {
        ...styles.tableHeaderCell,
        width: '10%'
    },
    totalCellLABEL: {
        ...styles.totalCell,
        width: '80%'
    },
    totalCellVALUE: {
        ...styles.totalCell,
        width: '20%',
        paddingRight: 10,
        textAlign: 'right'
    }
});

const PdfInvoice = (props) => {
    const customer = props.getCustomerObjById(props.customerId);

    const entityTotalCalculation = (entityName) => {
        const emptyCheck = props[entityName] === '' || props[entityName] === [];
        return emptyCheck ? 0 : props[entityName].reduce((total, entity) => {
            return total + (entity.quantity * entity.price);
        }, 0);
    }

    const invoiceTotalCalculation = () => entityTotalCalculation('actions') + entityTotalCalculation('newDevices');

    const renderEntities = (entityName) => {
        if (props[entityName] !== '' && props[entityName] !== []) {
            const getLabel = (entity) => {
                if (entityName === 'actions') {
                    return props.getActionNameById(entity.actionId);
                } else {
                    const deviceName = props.getDeviceNameById(entity.deviceId);
                    const deviceSerial = props.getDeviceSerialById(entity.deviceId);

                    if ( deviceSerial !== '' ) {
                        return (
                            <Text style={styles.devicesText}>
                                <Text style={styles.devicesName}>{deviceName}</Text>
                                <Text style={styles.devicesSerial}> (sn: {deviceSerial})</Text>
                            </Text>
                        );
                    } else {
                        return deviceName;
                    }
                }
            }
            return props[entityName].map((entity, index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={modifiers.tableCellLABEL}>{getLabel(entity)}</Text>
                    <Text style={modifiers.tableCellQUANTITY}>{entity.quantity}</Text>
                    <Text style={modifiers.tableCellPRICE}>{entity.price} rsd</Text>
                    <Text style={modifiers.tableCellPRICE}>{entity.quantity * entity.price} rsd</Text>
                </View>
            ))
        } else {
            return (
                <View style={styles.tableRow}>
                    <Text style={modifiers.tableCellLABEL}>N/A</Text>
                    <Text style={modifiers.tableCellQUANTITY}>0</Text>
                    <Text style={modifiers.tableCellPRICE}>0 rsd</Text>
                    <Text style={modifiers.tableCellPRICE}>0 rsd</Text>
                </View>
            );
        }
    }

    const renderCustomerInfoItem = ({label, value}) => {
        if ( !customer[value] ) return;
        return (
            <View style={styles.customerInfoGroup}>
                <Text style={styles.customerInfoLabel}>{label}: </Text>
                <Text style={styles.customerInfoText}>{customer[value]}</Text>
            </View>
        )
    }

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>Predračun broj: {props.serviceId}</Text>
                        <View style={styles.companyInfo}>
                            <Text style={modifiers.companyInfoTextMain}>GamesGuru</Text>
                            <Text style={styles.companyInfoText}>063/754-64-18,</Text>
                            <Text style={styles.companyInfoText}>Atile Jožefa 24, 24000 Subotica</Text>
                        </View>
                    </View>
                    <Image src="/img/gg-logo-2.png" style={styles.logo} />
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.box}>
                        <Text style={styles.boxHeader}>Podaci o korisniku:</Text>
                        <View style={styles.boxBody}>
                            {renderCustomerInfoItem({label: 'Ime', value: 'name'})}
                            {renderCustomerInfoItem({label: 'Email', value: 'email'})}
                            {renderCustomerInfoItem({label: 'Telefon', value: 'phone'})}
                            {renderCustomerInfoItem({label: 'Adresa', value: 'address'})}
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={modifiers.tableHeaderCellLABEL}>Napomene</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={modifiers.tableCellFULL}>
                                {props.remark === '' ? 'Nijedna napomena jos nije dodata.' : props.remark}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={modifiers.tableHeaderCellLABEL}>Izvršene radnje</Text>
                            <Text style={modifiers.tableHeaderCellQUANTITY}>Količina</Text>
                            <Text style={modifiers.tableHeaderCellPRICE}>Cena</Text>
                            <Text style={modifiers.tableHeaderCellPRICE}>Ukupno</Text>
                        </View>
                        {renderEntities('actions')}
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableHeader}>
                            <Text style={modifiers.tableHeaderCellLABEL}>Novi uređaji</Text>
                            <Text style={modifiers.tableHeaderCellQUANTITY}>Količina</Text>
                            <Text style={modifiers.tableHeaderCellPRICE}>Cena</Text>
                            <Text style={modifiers.tableHeaderCellPRICE}>Ukupno</Text>
                        </View>
                        {renderEntities('newDevices')}
                    </View>
                    <View style={styles.total}>
                        <Text style={modifiers.totalCellLABEL}>Ukupno:</Text>
                        <Text style={modifiers.totalCellVALUE}>{invoiceTotalCalculation()} rsd</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.signature}>
                        <Text style={styles.signatureName}>Zoltan Kalmar</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text style={styles.signatureName}>{customer.name}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default PdfInvoice;
