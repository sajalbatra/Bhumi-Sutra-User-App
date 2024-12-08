import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Modal,
    TextInput,
    Alert,
    Animated,
    Platform
} from 'react-native';
import {
    AntDesign,
    Entypo,
    Feather,
    FontAwesome,
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HeaderSection = () => {
    const [location, setLocation] = useState<any>(null);
    const [address, setAddress] = useState<any>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuSlideAnim = useRef(new Animated.Value(height)).current;

    const mapRef = useRef<MapView>(null);
    const Navigation = useNavigation<any>()
    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location permission is required to get current location');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = currentLocation.coords;
            const locationData = {
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };

            setLocation(locationData);
            const addressData = await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

            setAddress(addressData[0]);
            mapRef.current?.animateToRegion(locationData, 1000);
        } catch (error) {
            Alert.alert('Error', 'Failed to get current location');
            console.error(error);
        }
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            Animated.timing(menuSlideAnim, {
                toValue: height,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsMenuOpen(false));
        } else {
            setIsMenuOpen(true);
            Animated.timing(menuSlideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <View style={styles.headerContainer}>
                <View style={styles.headerTopRow}>
                    <View style={styles.locationContainer}>
                        <Entypo name="location-pin" size={30} color="white" />
                        {
                            (address) ? (
                                <View>
                                    {address.name && <Text style={styles.headerTitle}>{address.name}</Text>}
                                    <Text style={styles.headerSubtitle}>
                                        {address.street && `${address.street}, `}
                                        {address.district && `${address.district}, `}
                                        {address.city && `${address.city}, `}
                                        {address.region && `${address.region}, `}
                                        {address.country && address.country}
                                    </Text>
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.headerTitle}>Address not found</Text>
                                    <Text style={styles.headerSubtitle}>Please Give the location access</Text>
                                </View>
                            )
                        }
                    </View>
                    <View style={styles.headerIcons} >
                        <Feather name="bell" size={24} color="white" style={styles.iconMargin} />
                        <TouchableOpacity onPress={toggleMenu}>
                            <Feather name="menu" size={24} color="white" style={styles.iconMargin} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Animated.View
                style={[
                    styles.menuOverlay,
                    {
                        transform: [{ translateY: menuSlideAnim }],
                        display: isMenuOpen ? 'flex' : 'none'
                    }
                ]}
            >
                <View style={styles.menuContainer}>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={toggleMenu}
                        >
                            <View style={styles.closeButtonCircle}>
                                <Feather name="x" size={24} color="#030712" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.menuItemsContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => {
                            Navigation.navigate("Main", {
                                screen: "Tabs",
                                params: { screen: "Profile" },
                            });
                        }}>
                            <FontAwesome name="user" size={24} color="white" />
                            <Text style={styles.menuItemText}>Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { Navigation.navigate("Community") }}>
                            <FontAwesome name="group" size={24} color="white" />
                            <Text style={styles.menuItemText}>Community Updates</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { Navigation.navigate("Feedback") }}>
                            <MaterialIcons name="feedback" size={24} color="white" />                            
                            <Text style={styles.menuItemText}>Feedback</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem} onPress={() => { Navigation.navigate("Help") }}>
                            <MaterialIcons name="tips-and-updates" size={24} color="white" />
                            <Text style={styles.menuItemText}>Learn Tips</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: '#030712',
    },
    headerContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#888',
        fontSize: 14,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconMargin: {
        marginRight: 15,
    },
    menuOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.95)',
        zIndex: 100,
        marginHorizontal: "auto"
    },
    menuContainer: {
        paddingTop: Platform.OS === 'ios' ? 50 : 30,
        paddingHorizontal: 20,
        backgroundColor: '#030712',
        width: width,
        height: height,
        marginHorizontal: "auto"
    },
    closeButtonContainer: {
        alignItems: 'flex-end',
        marginBottom: 30,
    },
    closeButton: {
        padding: 10,
    },
    closeButtonCircle: {
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItemsContainer: {
        alignItems: 'center',
        marginTop: 20,
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        width: '100%',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignContent: "center",
    },
    menuItemText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: '600',
    }
});

export default HeaderSection;