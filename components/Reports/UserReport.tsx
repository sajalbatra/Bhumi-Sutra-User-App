import React, { useEffect, useState } from 'react';
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
import useratom from '@/recoil/atoms/loginatom';
import { useRecoilValue } from 'recoil';
import { Base_url } from '@/constants/Constants';
export default function UserReport() {
    const user=useRecoilValue<any>(useratom)
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${Base_url}/api/report/get/`+user?._id);
            if (!response.ok) {
                throw new Error('Failed to fetch reports');
            }
            const data = await response.json();
            setReports(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // setInterval(()=>{
            if (user?._id) {
                fetchReports();
            }
        // },6000)
    },[]);


    // useEffect(()=>{
    //     if(user?.reports!=null){
    //         setReports(user?.reports)
    //     }
    //     console.log(user?.reports)
    // },[user])
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
                <Text style={styles.reportTitle}>Report ID: {item._id}</Text>
                <Text style={styles.reportDate}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </Text>
            </View>
            <Text style={styles.reportStatus}>Status: {item.status}</Text>
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
                        <Text style={styles.modalTitle}>Report Details</Text>
                        <Text style={styles.modalDetail}>
                            ID: {selectedReport._id}
                        </Text>
                        <Text style={styles.modalDetail}>
                            Description: {selectedReport.description}
                        </Text>
                        <Text style={styles.modalDetail}>
                            Status: {selectedReport.status}
                        </Text>
                        <Text style={styles.modalDetail}>
                            Created At:{' '}
                            {new Date(selectedReport.createdAt).toLocaleString()}
                        </Text>
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
                Track the progress of your {reports?.length || 0} submitted reports
            </Text>

            <FlatList
                data={reports}
                renderItem={renderReportItem}
                keyExtractor={(item:any) => item._id}
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