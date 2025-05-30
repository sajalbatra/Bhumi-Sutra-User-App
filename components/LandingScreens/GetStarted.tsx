import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const GetStartedLandingScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <Image source={require('../../assets/icons/PurpleEllipseLarge1.png')} style={styles.topLeftEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseLarge2.png')} style={styles.bottomRightEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseSmall.png')} style={styles.topRightEllipse} />
            <View style={styles.contentContainer}>
                <Text style={styles.maninHeading}>You're ready to make a difference!</Text>    
                <Image 
                    source={require('../../assets/images/GetStarted.png')} 
                    style={styles.mainImage} 
                />
            </View>
            <View style={styles.bottomcontainer}>
            <TouchableOpacity style={{borderRadius:"100%",backgroundColor:"#7836E9",padding:10}} onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#D7C6F6" />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.skipButton}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={{borderRadius:"100%",backgroundColor:"#7836E9",padding:10}} onPress={() => navigation.push('Login')}>
                    <AntDesign name="arrowright" size={24} color="#D7C6F6" />
                </TouchableOpacity>
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
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
        alignSelf: "center"
    },
    maninHeading: {
        color: '#F6F6F6',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 28,
        textAlign: "center",
        // paddingHorizontal: 1,
        position: 'absolute', 
        top: height * 0.2, 
        zIndex: 10,
    },
    mainImage: {
        width: width ,
        height: height,        
        objectFit:"contain"
    },
    bottomcontainer: {
        width: width - 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        marginHorizontal: 20,
        position: 'absolute',
        bottom: height * 0.1

    },
    skipButton: {
        backgroundColor: '#7836E9',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        width: width * 0.3,
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
        marginTop: 20

    },
});

export default GetStartedLandingScreen;
