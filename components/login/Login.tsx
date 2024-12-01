import { router } from 'expo-router';
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
  Alert
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateEmail = (email: any) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // TODO: Implement actual login logic (e.g., API call)
    console.log('Login attempt with:', { email, password });
    Alert.alert('Success', 'Login functionality to be implemented');
  };

  const handleResetPassword = () => {
    // TODO: Implement password reset navigation or logic
    Alert.alert('Reset Password', 'Password reset functionality to be implemented');
  };

  const handleSignUp = () => {
    // TODO: Implement sign up navigation
    router.push("/Register")
    //Alert.alert('Sign Up', 'Sign up functionality to be implemented');
  };

  const handleDigilockerLogin = () => {
    // TODO: Implement Digilocker login
    Alert.alert('Digilocker Login', 'Digilocker login functionality to be implemented');
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

      <View style={styles.headerContainer}>
        <Text style={styles.mainHeading}>Welcome to BhumiSutrat</Text>
        <Text style={styles.mainText}>
          Easily report unauthorized construction and keep your community safe!
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter your email'
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
            placeholder='Enter your password'
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

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleDigilockerLogin}
        >
          <Text style={styles.buttonText}>Login with Digilocker</Text>
        </TouchableOpacity>
      </View>
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#7836E9',
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

export default LoginScreen;