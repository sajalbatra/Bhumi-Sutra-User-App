import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const NoReportsScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <View style={styles.content}>
                <Text style={styles.title}>No Reports Yet</Text>
                <Text style={styles.subtitle}>Start Making a Difference!</Text>
                <Image
                    source={require("@/assets/images/NoReportScreenimg.png")}
                    alt="No reports found"
                    style={styles.reportImage}
                />
                <Text style={styles.message}>
                    You haven’t reported any suspicious activities yet. If you spot unauthorized construction, let us know, and we’ll take it from there!
                </Text>
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Report Now</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Learn how to submit a report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#030712',
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: width
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '90%',
    },
    reportImage: {
        height: height * 0.4,
        width: '100%',
        resizeMode: 'contain',
        marginVertical: 20,
        marginHorizontal: "auto",
        marginLeft: -width * 0.05
    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        color: '#D7C6F6',
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        color: '#D7C6F6',
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    actions: {
        width: '100%',
        marginTop: 16,
    },
    button: {
        borderRadius: 8,
        paddingVertical: 12,
        marginBottom: 12,
        backgroundColor: '#1A2230',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default NoReportsScreen;
