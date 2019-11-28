import React from 'react';
import { Document, Page, View, Image, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

import { colors } from '../../helpers';

const styles = StyleSheet.create({
    page: {
        padding: 20
    },
    heading: {
        marginBottom: 20,
        fontSize: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: 3,
        borderBottomColor: colors.rddarkgray
    },
    companyInfo: {
        width: '40%'
    },
    companyInfoText: {
        marginTop: 5,
        fontSize: 10
    },
    logo: {
        display: 'block',
        marginLeft: 5,
        width: '60%'
    },
    customerInfo: {
        width: '40%',
        fontSize: 12
    },
    customerInfoHeader: {
        padding: 5,
        marginBottom: 5,
        backgroundColor: colors.rdgray,
        color: '#fff'
    },
    customerInfoGroup: {
        flexDirection: 'row',
        marginBottom: 5,
        fontSize: 10
    },
    customerInfoLabel: {
        fontWeight: 'bold'
    },
    serviceGroup: {
        marginBottom: 20
    },
    serviceLabel: {
        marginBottom: 5,
        fontSize: 13
    },
    serviceText: {
        padding: 10,
        border: 1,
        borderColor: colors.rddarkgray,
        width: '80%',
        fontSize: 10,
        color: colors.rdgray
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
    },
    signature: {
        paddingTop: 20,
        width: '20%',
        borderTop: 1,
        borderBottomColor: colors.rddarkgray
    },
    signatureName: {
        fontSize: 10,
        textAlign: 'center',
        color: colors.rdgray
    },
    devicesView: {
        padding: 10,
        border: 1,
        borderColor: colors.rddarkgray,
        width: '80%',
        fontSize: 10,
        color: colors.rdgray
    },
    devicesText: {
        marginBottom: 5
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
                        <Image src="/dp-logo.png" style={styles.logo} />
                        <Text style={styles.companyInfoText}>Zoltan Kalmar</Text>
                        <Text style={styles.companyInfoText}>Petra Petrovica 23,</Text>
                        <Text style={styles.companyInfoText}>24415 Hajdukovo</Text>
                    </View>
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerInfoHeader}>Customer Info</Text>
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
                <View style={styles.body}>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Title:</Text>
                        <Text style={styles.serviceText}>{props.inputs.title.value}</Text>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Description:</Text>
                        <Text style={styles.serviceText}>{props.inputs.description.value}</Text>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Service Devices:</Text>
                        <View style={styles.devicesView}>
                            {renderDevices()}
                        </View>
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