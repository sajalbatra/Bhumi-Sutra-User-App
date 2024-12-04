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
  Alert
} from 'react-native';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import HeaderSection from './Header';
const { width, height } = Dimensions.get('window');

const MapViewScreen = () => {
  const [location, setLocation] = useState<any>(null);
  // const [markers, setMarkers] = useState<any>([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<MapView>(null);

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

      mapRef.current?.animateToRegion(locationData, 1000);
    } catch (error) {
      Alert.alert('Error', 'Failed to get current location');
      console.error(error);
    }
  };


  const [markers, setMarkers] = useState([
    {
      coordinate: { 
        latitude: 28.918174, 
        longitude: 77.129928 
      },
      title: 'Location 1',
      description: 'First marker location'
    },
    {
      coordinate: { 
        latitude: 28.924174, 
        longitude: 77.135928 
      },
      title: 'Location 2', 
      description: 'Second marker location'
    }
  ]);

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const filterLocations = () => {
    // Placeholder for filtering logic
    setFilterModalVisible(false);
  };

  const searchLocations = () => {
    // Placeholder for search logic
    setSearchModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030712" />

      <View style={styles.mapViewConatiner}>
        {/* <View style={styles.headerTopRow}>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={30} color="white" />
            <View>
              <Text style={styles.headerTitle}>Home</Text>
              <Text style={styles.headerSubtitle}>123 ABC Down.....</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>

            <Feather name="menu" size={24} color="white" />
          </View>
        </View> */}
        <HeaderSection/>
        <View style={styles.navigationButtons}>
          <TouchableOpacity style={styles.navHomeButton}>
            <Text style={styles.navButtonText}>Home</Text>
            <Ionicons name="home-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navMapButton}>
            <Text style={styles.navButtonText}>Map View</Text>
            <Feather name="map" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: 28.918174,
              longitude: 77.129928,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markers.map((marker: any, index: any) => (
              <Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
                description={marker.description}
              />
            ))}
          </MapView>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={styles.navHomeButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text style={styles.navButtonText}>Filter</Text>
            <AntDesign name="filter" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navMapButton}
            onPress={() => setSearchModalVisible(true)}
          >
            <Text style={styles.navButtonText}>Search</Text>
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>Click on markers for more information.</Text>
      </View>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Locations</Text>
            {/* Add filter options here */}
            <TouchableOpacity style={styles.modalButton} onPress={filterLocations}>
              <Text style={styles.modalButtonText}>Apply Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSearchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search Locations</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter location"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.modalButton} onPress={searchLocations}>
              <Text style={styles.modalButtonText}>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#030712',
  },
  mapViewConatiner: {
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navHomeButton: {
    alignItems: 'center',
    backgroundColor: '#7836E9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignContent: "center",
    width: width * 0.45
  },
  navMapButton: {
    alignItems: 'center',
    backgroundColor: '#1A2230',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignContent: "center",
    width: width * 0.45
  },
  navButtonText: {
    color: 'white',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 22,
  },
  mapContainer: {
    marginHorizontal: "auto",
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#D7C6F6",
    height: height * 0.4,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20
  },
  map: {
    width: "100%",
    height: "100%",
  },
  infoText: {
    color: "#D7C6F6",
    fontSize: 16,
    fontWeight: '400',
    textAlign: "center"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: '#1A2230',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%'
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  modalButton: {
    backgroundColor: '#7836E9',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16
  },
  modalCancelText: {
    color: '#888',
    marginTop: 15
  },
  searchInput: {
    backgroundColor: '#030712',
    color: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15
  }

});

export default MapViewScreen