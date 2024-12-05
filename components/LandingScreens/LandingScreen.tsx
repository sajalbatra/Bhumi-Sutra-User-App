import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { Svg, Defs, LinearGradient as SVGLinearGradient, Stop, Text as SVGText } from 'react-native-svg';
import { useNavigation} from '@react-navigation/native';

const GradientText = ({ text, gradientColors, style }:any) => {
    return (
        <Svg height="50" width="100%">
            <Defs>
                <SVGLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    {gradientColors.map((color:any, index:any) => (
                        <Stop key={index} offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />
                    ))}
                </SVGLinearGradient>
            </Defs>
            <SVGText
                fill="url(#grad)"
                fontSize="28"
                fontWeight="bold"
                textAnchor="middle"
                x="50%"
                y="40"
                {...style}
                >
                {text}
            </SVGText>
        </Svg>
    );
};
const { width, height } = Dimensions.get('window');
const LandingScreen = () => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <Image source={require('../../assets/icons/PurpleEllipseLarge1.png')} style={styles.topLeftEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseLarge2.png')} style={styles.bottomRightEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseSmall.png')} style={styles.topRightEllipse} />
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <Text style={styles.welcomeText}>Welcome To</Text>
            <GradientText
                text="BhumiSutra"
                gradientColors={['#D7C6F6', '#CDBBEC', '#C1ADE5', '#967DC4', '#7C5EAF', '#735B9D']}
                style={styles.gradientText}
            />
            <Text style={styles.paratext}>
            Empowering Communities for Ethical Development
            </Text>
            <Image source={require('../../assets/images/LandingScreen.png')} style={styles.mainImage} />
            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.push('ReportLanding')} >
                <Text style={styles.getStartedText} >Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#030712',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    }
    ,
    topLeftEllipse: {
        position: 'absolute',
        top: -50,
        left: -50,
        width: Dimensions.get('window').height * 0.3,
        height: Dimensions.get('window').height * 0.8,
        resizeMode: 'contain',
    },
    bottomRightEllipse: {
        position: 'absolute',
        bottom: -50,
        right: -50,
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').height * 0.4,
        resizeMode: 'contain',
    },
    topRightEllipse: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').height * 0.25,
        resizeMode: 'contain',
    },
    logo: {
        width: Dimensions.get('window').width ,
        height: Dimensions.get('window').width*0.3,
        marginBottom: 20,
    },
    welcomeText: {
        color: '#F6F6F6',
        fontSize: 20,
        fontWeight:600,
        lineHeight:24
    },
    gradientText: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight:24,
    },
    mainImage: {
        width: Dimensions.get('window').height ,
        height: Dimensions.get('window').height*0.5,
        resizeMode: 'contain',
    },
    getStartedButton: {
        backgroundColor: '#7836E9',
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 40,
        width:width-50,
        marginHorizontal:"auto"
    },
    getStartedText: {
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
        color: '#FFF',
    },
    paratext:{
        fontWeight: '400',
        fontSize: 14,
        textAlign: 'center',
        color: '#D7C6F6', 
        lineHeight:24
    }
});

export default LandingScreen;
