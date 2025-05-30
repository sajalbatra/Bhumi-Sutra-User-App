import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TrackLandingScreen = () => {
    const navigation = useNavigation<any>();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <Image source={require('../../assets/icons/PurpleEllipseLarge1.png')} style={styles.topLeftEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseLarge2.png')} style={styles.bottomRightEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseSmall.png')} style={styles.topRightEllipse} />
            {/* <Image source={require('../../assets/logo.png')} style={styles.logo} /> */}
            <View style={{paddingHorizontal:8,alignSelf:"center", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <Text style={styles.maninHeading}>Track Your Reports</Text>
                <Text style={styles.mainText}>
                Stay updated with real-time progress of your submissions, from review to resolution.
                </Text>
            </View>
            <Image source={require('../../assets/images/Track.png')} style={styles.mainImage} />
            <View style={styles.bottomcontainer}>
            <View style={styles.bottomcontainer}>
                <TouchableOpacity style={{borderRadius:"100%",backgroundColor:"#7836E9",padding:10}} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#D7C6F6" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{borderRadius:"100%",backgroundColor:"#7836E9",padding:10}} onPress={() => navigation.push('EngageLanding')}>
                    <AntDesign name="arrowright" size={24} color="#D7C6F6" />
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#030712',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    topLeftEllipse: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: height * 0.3,
        height: height * 0.8,
        resizeMode: 'contain',
    },
    bottomRightEllipse: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: width * 0.8,
        height: height * 0.4,
        resizeMode: 'contain',
    },
    topRightEllipse: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: width * 0.5,
        height: height * 0.25,
        resizeMode: 'contain',
    },
    logo: {
        width: width,
        height: width * 0.3,
        marginBottom: 20,
        alignSelf:"center"
    },
    maninHeading: {
        color: '#F6F6F6',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28, 
        textAlign:"center",
        paddingHorizontal:1
    },
    mainImage: {
        width: "100%",
        height: height * 0.5,
        objectFit:"contain"
    },
    bottomcontainer: {
        width:width-50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-between",
        // marginHorizontal: 20,
    },
    skipButton: {
        backgroundColor: '#7836E9',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: width*0.3,
        marginLeft: 10,
        alignSelf: 'center',
    },
    skipText: {
        fontWeight: '600',
        fontSize: width * 0.04, 
        textAlign: 'center',
        color: '#FFF',
    },
    mainText: {
        fontWeight: '400',
        fontSize: 16, 
        textAlign: 'center',
        color: '#D7C6F6',
        lineHeight: 24, 
        marginTop:20,
        

    },
});

export default TrackLandingScreen;
