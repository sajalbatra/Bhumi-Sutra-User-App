import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Dimensions,
    StatusBar
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function UserReport() {
    const [reports, setReports] = useState([
        {
            id: '1',
            title: 'Incident Report',
            date: '2024-03-15',
            status: 'Submitted',
            details: 'Reported a safety concern in building A, section 2.',
        },
        {
            id: '2',
            title: 'Maintenance Request',
            date: '2024-03-10',
            status: 'In Progress',
            details: 'Requested repair for faulty electrical outlet in conference room.',
        },
    ]);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const openReportDetails = (report: any) => {
        setSelectedReport(report);
        setIsModalVisible(true);
    };

    const closeReportDetails = () => {
        setSelectedReport(null);
        setIsModalVisible(false);
    };

    const renderReportItem = ({ item }: any) => (
        <TouchableOpacity
            style={styles.reportItem}
            onPress={() => openReportDetails(item)}
        >
            <View style={styles.reportHeader}>
                <Text style={styles.reportTitle}>{item.title}</Text>
                <Text style={styles.reportDate}>{item.date}</Text>
            </View>
            <Text style={styles.reportStatus}>{item.status}</Text>
        </TouchableOpacity>
    );

    const renderReportDetailsModal = () => {
        if (!selectedReport) return null;

        return (
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={closeReportDetails}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedReport.title}</Text>
                        <Text style={styles.modalDetail}>Date: {selectedReport.date}</Text>
                        <Text style={styles.modalDetail}>Status: {selectedReport.status}</Text>
                        <Text style={styles.modalDetailsFull}>{selectedReport.details}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeReportDetails}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <Text style={styles.infoText}>Your Reports</Text>
            <Text style={styles.message}>
                Track the progress of your {reports.length} submitted reports
            </Text>

            <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.reportList}
            />

            {renderReportDetailsModal()}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#030712',
        padding: 15,
        height: height,
        width: width
    },
    infoText: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        marginVertical: 15,
        color: 'white'

    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: "#D7C6F6",
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 400

    },
    reportList: {
        paddingBottom: 20,
    },
    reportItem: {
        backgroundColor: '#1F2937',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    reportHeader: {
        flex: 1,
        marginRight: 10,
    },
    reportTitle: {
        color: '#D7C6F6',
        fontSize: 18,
        fontWeight: '600',
    },
    reportDate: {
        color: '#9CA3AF',
        fontSize: 14,
        marginTop: 5,
    },
    reportStatus: {
        color: '#10B981',
        fontSize: 14,
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: width * 0.85,
        backgroundColor: '#1F2937',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        color: '#D7C6F6',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 15,
    },
    modalDetail: {
        color: '#9CA3AF',
        fontSize: 16,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    modalDetailsFull: {
        color: 'white',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'left',
        width: '100%',
    },
    closeButton: {
        backgroundColor: '#4B5563',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});