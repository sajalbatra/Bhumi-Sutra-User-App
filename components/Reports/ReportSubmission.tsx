import React, { useState, useRef, useEffect } from 'react';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    Modal,
    ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import uploadToCloudinary from '@/UploadtoCloud';

const { width, height } = Dimensions.get('window');

const ReportSubmission = () => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [capturedImage, setCapturedImage] = useState<any>(null);
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    const openCamera = () => {
        setIsCameraModalVisible(true);
    };
    const [location, setLocation] = useState<{
        latitude: number,
        longitude: number,
        address: any
    } | null>(null);
    // const addressParts = location?.address ? location.address.split(',') : ['Location detected'];
    const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
    const cameraRef = useRef<CameraView>(null);
    const requestLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    };
    const createFullAddress = (location: any) => {
        const parts = [
            location.name,            // House number or building name
            location.street,          // Street (if available)
            location.district,        // District or locality
            location.city,            // City
            location.region,          // Region/State
            location.postalCode,      // Postal code
            location.country,         // Country
        ];

        // Filter out null or undefined parts and join with a comma
        return parts.filter((part) => part).join(", ");
    };
    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        try {
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const addressResponse = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            setLocation({
                latitude,
                longitude,
                address: addressResponse[0]
            });
            createFullAddress(addressResponse[0])
        } catch (error) {
            console.error('Error getting location:', error);
            Alert.alert('Location Error', 'Could not retrieve location');
        }
    };

    // const openImagePicker = async () => {
    //     try {
    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //         });

    //         if (!result.canceled) {
    //             setCapturedImage(result.assets[0].uri);
    //         }
    //     } catch (error) {
    //         console.error('Error picking image:', error);
    //         Alert.alert('Image Error', 'Could not pick image');
    //     }
    // };

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setCapturedImage(photo?.uri);
                setIsCameraModalVisible(false);
            } catch (error) {
                console.error('Error capturing photo:', error);
                Alert.alert('Camera Error', 'Could not capture image');
            }
        }
    };

    const submitReport = async () => {
        // Validate report submission
        if (!capturedImage) {
            Alert.alert('Missing Image', 'Please capture an image for the report');
            return;
        }

        if (!description.trim()) {
            Alert.alert('Missing Description', 'Please provide a description of the suspicious activity');
            return;
        }
        setIsSubmitting(true);
        const imageUrl = await uploadToCloudinary({ file: capturedImage });
        // Construct report object
        const report = {
            image: imageUrl,
            description: description.trim(),
            isAnonymous,
            location: location ? {
                latitude: location.latitude,
                longitude: location.longitude,
                address: location.address
            } : null
        };

        // TODO: Implement actual report submission logic (e.g., API call)
        console.log('Report Submitted:', report);
        Alert.alert('Report Submitted', 'Thank you for your submission');
        setIsSubmitting(false);
        // Reset form
        setCapturedImage(null);
        setDescription('');
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
        >
            <StatusBar barStyle="light-content" backgroundColor="#030712" />

            <Text style={styles.infoText}>
                Report Suspicious Construction
            </Text>

            {/* Camera Section */}
            <View style={styles.imageUploadContainer}>
                {capturedImage ? (
                    <Image
                        source={{ uri: capturedImage }}
                        style={styles.capturedImage}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No Image Selected</Text>
                    </View>
                )}
                <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={openCamera}
                >
                    <Ionicons name="camera" size={20} color="white" />
                    <Text style={styles.uploadButtonText}>Take Photo</Text>
                </TouchableOpacity>

            </View>

            {/* Camera Modal */}
            <Modal
                visible={isCameraModalVisible}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.cameraModalContainer}>
                    <CameraView
                        ref={cameraRef}
                        style={styles.cameraModal}
                        facing={facing}
                    >
                        <TouchableOpacity
                            style={styles.closeCameraButton}
                            onPress={() => setIsCameraModalVisible(false)}
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <View style={styles.cameraControls}>
                            <TouchableOpacity
                                style={styles.cameraButton}
                                onPress={takePicture}
                            >
                                <Ionicons name="camera" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                </View>
            </Modal>

            {/* Location Display */}
            {location && (
                <View style={styles.locationContainer}>
                    <Ionicons name="location" size={20} color="#D7C6F6" />
                    <ScrollView
                        horizontal={true} // Enable horizontal scrolling
                        showsHorizontalScrollIndicator={true} // Optional: Show scroll indicator
                        contentContainerStyle={styles.scrollContent} // Optional styling
                    >
                        <Text style={styles.locationText}>
                            {createFullAddress(location?.address)}
                        </Text>
                    </ScrollView>
                </View>
            )}


            {/* Description Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Describe the suspicious activity"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={4}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            {/* Anonymous Toggle */}
            <TouchableOpacity
                style={styles.anonymousContainer}
                onPress={() => setIsAnonymous(!isAnonymous)}
            >
                <Ionicons
                    name={isAnonymous ? "checkbox" : "checkbox-outline"}
                    size={24}
                    color="#D7C6F6"
                />
                <Text style={styles.anonymousText}>Submit Anonymously</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={submitReport}
            >
                <Text style={styles.submitButtonText}>Submit Report</Text>
            </TouchableOpacity>
            
            {isSubmitting ? (
                <ActivityIndicator color="white" />
            ) : (
                null
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#030712',

    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    infoText: {
        color: "#D7C6F6",
        fontSize: 24,
        fontWeight: '600',
        textAlign: "center",
        marginVertical: 15
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white'
    },
    cameraContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#1A2230',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 15,
    },
    camera: {
        flex: 1,
    },
    capturedImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraButton: {
        backgroundColor: 'rgba(3, 7, 18, 0.7)',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    switchCameraButton: {
        backgroundColor: 'rgba(3, 7, 18, 0.7)',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    retakePictureButton: {
        backgroundColor: '#D7C6F6',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retakeButtonText: {
        color: '#030712',
        fontWeight: '600',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#1A2230',
        borderRadius: 12,
        marginBottom: 15,
    },
    input: {
        color: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A2230',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,

    },
    locationText: {
        color: '#D7C6F6',
        marginLeft: 10,
    },
    anonymousContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    anonymousText: {
        color: '#D7C6F6',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#7836E9',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,

    },
    imageUploadContainer: {
        width: '100%',
        backgroundColor: '#1A2230',
        borderRadius: 12,
        marginBottom: 15,
        padding: 15,
        height: height * 0.3,
        gap: 8
    },
    noImageContainer: {
        height: height * 0.18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A3240',
        borderRadius: 12,
        marginBottom: 15,
    },
    noImageText: {
        color: '#D7C6F6',
        fontSize: 16,
    },
    imageUploadButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    uploadButton: {
        backgroundColor: '#7836E9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    uploadButtonText: {
        color: 'white',
        marginLeft: 10,
    },
    cameraModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    cameraModal: {
        flex: 1,
        position: 'relative',
    },
    closeCameraButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 25,
        padding: 10,
    },
});

export default ReportSubmission;