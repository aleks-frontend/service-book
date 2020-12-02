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
        alignItems: 'flex-start',
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
    customerInfo: {
        fontSize: 12
    },
    customerInfoHeader: {
        fontFamily: 'Roboto-Bold',
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
        fontFamily: 'Roboto-Bold',
        fontSize: 10,
        color: '#000',
        backgroundColor: colors.rdlightgray,
    },
    serviceText: {
        padding: '10px 5px',
        border: 1,
        borderTop: 0,
        fontSize: 10,
        color: colors.rddarkgray,
        borderColor: colors.rdlightgray
    },
    devicesItem: {
        marginBottom: 5,
    },
    devicesSerial: {
        marginLeft: 5,
        fontSize: 9
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
    }
});

const PdfDispatchNote = (props) => {
    const customer = props.getCustomerObjById(props.customerId);
    const deviceKeys = props.deviceIds;

    const renderDevices = () => (
        deviceKeys.map(key => {
            const deviceName = props.getDeviceNameById(key);
            const deviceSerial = props.getDeviceSerialById(key);

            return (
                <View style={styles.devicesItem} key={key}>
                    <Text style={styles.devicesText}>- {deviceName}</Text>
                    <Text style={styles.devicesSerial}>{deviceSerial && `(sn: ${deviceSerial})`}</Text>
                </View>
            )
        })
    )

    const renderCustomerInfoItem = ({ label, value }) => {
        if (!customer[value]) return;
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
                        <Text style={styles.headerTitle}>ID popravke: {props.serviceId}</Text>
                        <View style={styles.companyInfo}>
                            <Text style={modifiers.companyInfoTextMain}>GamesGuru</Text>
                            <Text style={styles.companyInfoText}>063/754-64-18,</Text>
                            <Text style={styles.companyInfoText}>Atile Jožefa 24, 24000 Subotica</Text>
                        </View>
                    </View>
                    <Image src="/img/gg-logo-2.png" style={styles.logo} />
                </View>
                <View style={styles.body}>
                    <View style={styles.serviceGroup}>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerInfoHeader}>Podaci o korisniku:</Text>
                            <View style={styles.serviceText}>
                                {renderCustomerInfoItem({ label: 'Ime', value: 'name' })}
                                {renderCustomerInfoItem({ label: 'Email', value: 'email' })}
                                {renderCustomerInfoItem({ label: 'Telefon', value: 'phone' })}
                                {renderCustomerInfoItem({ label: 'Adresa', value: 'address' })}
                            </View>
                        </View>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Uređaji na servisu:</Text>
                        <View style={styles.serviceText}>
                            {renderDevices()}
                        </View>
                    </View>
                    <View style={styles.serviceGroup}>
                        <Text style={styles.serviceLabel}>Opis kvara:</Text>
                        <Text style={modifiers.serviceTextDescription}>{props.description}</Text>
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
