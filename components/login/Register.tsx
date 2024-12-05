import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');
import { useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const validateEmail = (email: any) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    const handleValidatePhoneNumber = () => {
        const isValid = /^[0-9]{10}$/.test(phoneNumber);
        return isValid
    };
    const handleSignUp = () => {
        if (!fullname.trim()) {
            Alert.alert('Error', 'Please enter your full name');
            return;
        }

        if (!phoneNumber.trim()) {
            Alert.alert('Error', 'Please enter your phone number');
            return;
        }

        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
        if (handleValidatePhoneNumber()) {
            Alert.alert('Error', 'Please enter a valid Phone Number');
        }
        if (!password) {
            Alert.alert('Error', 'Please enter a password');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        // TODO: Implement actual sign up logic (e.g., API call)
        console.log('Sign up attempt with:', {
            fullname,
            phoneNumber,
            email
        });
        Alert.alert('Success', 'Sign up functionality to be implemented');
    };

    const handleDigilockerSignUp = () => {
        // TODO: Implement Digilocker sign up
        Alert.alert('Digilocker Sign Up', 'Digilocker sign up functionality to be implemented');
    };

    const handleLoginNavigation = () => {
        // TODO: Implement navigation to login screen
        navigation.navigate("Login")
        //Alert.alert('Navigation', 'Navigation to login screen to be implemented');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" backgroundColor="#030712" />

            <Image source={require('../../assets/icons/PurpleEllipseLarge1.png')} style={styles.topLeftEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseLarge2.png')} style={styles.bottomRightEllipse} />
            <Image source={require('../../assets/icons/PurpleEllipseSmall.png')} style={styles.topRightEllipse} />

            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.mainHeading}>Create Your Account</Text>
                    <Text style={styles.mainText}>
                        Join BhumiSutra and help keep your community safe!
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Full Name'
                            placeholderTextColor="#888"
                            value={fullname}
                            onChangeText={setFullname}
                            autoCapitalize="words"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Phone Number'
                            placeholderTextColor="#888"
                            value={phoneNumber}
                            onChangeText={setphoneNumber}
                            autoCapitalize="words"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Email Address'
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Create Password'
                            placeholderTextColor="#888"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!isPasswordVisible}
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibilityToggle}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            <Text style={styles.passwordVisibilityText}>
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='Confirm Password'
                            placeholderTextColor="#888"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!isConfirmPasswordVisible}
                        />
                        <TouchableOpacity
                            style={styles.passwordVisibilityToggle}
                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        >
                            <Text style={styles.passwordVisibilityText}>
                                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={handleDigilockerSignUp}
                    >
                        <Text style={styles.buttonText}>Sign Up with Digilocker</Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleLoginNavigation}>
                            <Text style={styles.loginLinkText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        backgroundColor: '#030712',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 30,
    },
    formContainer: {
        width: width - 50,
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: '#1A2230',
        borderRadius: 12,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        color: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    passwordVisibilityToggle: {
        paddingRight: 15,
    },
    passwordVisibilityText: {
        color: '#7836E9',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: '#7836E9',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    secondaryButton: {
        width: '100%',
        backgroundColor: '#7836E9',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#888',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    loginText: {
        color: '#D7C6F6',
    },
    loginLinkText: {
        color: '#7836E9',
        fontWeight: '600',
    },
    mainHeading: {
        color: '#F6F6F6',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    mainText: {
        color: '#D7C6F6',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
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
});

export default SignUpScreen;