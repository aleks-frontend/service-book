import React from 'react';
import { Document, Page, View, Image, Text, StyleSheet, Font } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

import { colors } from '../../helpers';

Font.register(`/fonts/Roboto-Bold.ttf`, {
    family: 'Roboto-Bold',
    weight: '700',
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
    companyInfo: {
        flex: 1,
        borderTop: 2,
        borderTopColor: colors.rdlightgray
    },
    companyInfoText: {
        display: 'block',
        marginTop: 1,
        fontSize: 10,
        lineHeight: '1em'
    },
    logo: {
        display: 'block',
        marginLeft: 5,
        width: 160
    },
    customerInfo: {
        fontSize: 12
    },
    customerInfoHeader: {
        padding: 5,
        backgroundColor: colors.rdlightgray,
        color: '#000'
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
        marginBottom: 5
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
        fontFamily: 'Roboto-Bold'
    }
});

const PdfDispatchNote = (props) => {
    const customer = props.customers[props.inputs.customers.value[0]];
    const deviceKeys = props.inputs.devices.value;

    const renderDevices = () => (
        deviceKeys.map(key => {
            const device = props.devices[key];
            return <Text key={key} style={styles.devicesText}>- {device.name}</Text>
        })
    )

    return (
        <Document>
            <Page style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.companyInfo}>
                        <Text style={modifiers.companyInfoTextMain}>Zoltan Kalmar</Text>
                        <Text style={styles.companyInfoText}>Petra Petrovica 23,</Text>
                        <Text style={styles.companyInfoText}>24415 Hajdukovo</Text>
                    </View>
                    <Image src="/dp-logo.png" style={styles.logo} />
                </View>
                <View style={styles.body}>
                    <View style={styles.serviceGroup}>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerInfoHeader}>Customer Info</Text>
                            <View style={styles.serviceText}>
                                <View style={styles.customerInfoGroup}>
                                    <Text style={styles.customerInfoLabel}>Name: </Text>
                                    <Text style={styles.customerInfoText}>{customer.name}</Text>
                                </View>
                                <View style={styles.customerInfoGroup}>
                                    <Text style={styles.customerInfoLabel}>Email: </Text>
                                    <Text style={styles.customerInfoText}>{customer.email}</Text>
                                </View>
                                <View style={styles.customerInfoGroup}>
                                    <Text style={styles.customerInfoLabel}>Phone: </Text>
                                    <Text style={styles.customerInfoText}>{customer.phone}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Title:</Text>
                        <Text style={styles.serviceText}>{props.inputs.title.value}</Text>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Devices:</Text>
                        <View style={styles.serviceText}>
                            {renderDevices()}
                        </View>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Description:</Text>
                        <Text style={modifiers.serviceTextDescription}>{props.inputs.description.value}</Text>
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

export default PdfDispatchNote;