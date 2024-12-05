import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import HeaderSection from '../Home/Header';

const { width, height } = Dimensions.get('window');

const ProfileSettingsScreen = () => {
    const [reportUpdatesNotifications, setReportUpdatesNotifications] = useState(true);
    const [newFlaggedSitesNotifications, setNewFlaggedSitesNotifications] = useState(true);
    const [communityUpdatesNotifications, setCommunityUpdatesNotifications] = useState(true);
    const [allowReportVisibility, setAllowReportVisibility] = useState(true);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#030712" />
            <HeaderSection />
            <Text style={styles.title}>
                Profile & Settings
            </Text>
            <View style={styles.profileContainer}>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>John Doe</Text>
                    <Text style={styles.phoneNumber}>(999) 111-0000</Text>
                    <Text style={styles.email}>Email</Text>
                </View>
                <View style={styles.profilePictureContainer}>
                    <Image
                        source={require("@/assets/images/userimg.jpg")}
                        style={styles.profilePicture}
                        alt="User image"
                    />
                </View>

            </View>

            <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Notification Settings</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Report updates notifications</Text>
                    <Switch
                        value={reportUpdatesNotifications}
                        onValueChange={setReportUpdatesNotifications}
                        trackColor={{ false: '#767577', true: '#7836E9' }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>New flagged sites notifications</Text>
                    <Switch
                        value={newFlaggedSitesNotifications}
                        onValueChange={setNewFlaggedSitesNotifications}
                        trackColor={{ false: '#767577', true: '#7836E9' }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Community updates notifications</Text>
                    <Switch
                        value={communityUpdatesNotifications}
                        onValueChange={setCommunityUpdatesNotifications}
                        trackColor={{ false: '#767577', true: '#7836E9' }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>

                <Text style={styles.sectionTitle}>Privacy Controls</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Allow visibility of submitted reports</Text>
                    <Switch
                        value={allowReportVisibility}
                        onValueChange={setAllowReportVisibility}
                        trackColor={{ false: '#767577', true: '#7836E9' }}
                        thumbColor={'#f4f3f4'}
                    />
                </View>

                <Text style={styles.sectionTitle}>Help and Support</Text>
                <TouchableOpacity style={styles.helpButton}>
                    <Text style={styles.helpButtonText}>Contact us for assistance or review FAQs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.helpButton}>
                    <Text style={styles.helpButtonText}>Provide Feedback</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.helpButton}>
                    <Text style={styles.helpButtonText}>Help and Tutorials</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#030712',
        width: width,
        height: height
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#4B5563',
        paddingHorizontal: 16,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    phoneNumber: {
        color: '#9CA3AF',
        fontSize: 16,
        marginVertical: 8,
    },
    email: {
        color: '#D7C6F6',
        fontSize: 16,
    },
    profilePictureContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#4B5563',
        overflow: 'hidden',
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    settingsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,

    },
    title: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center',
    },
    sectionTitle: {
        color: '#D7C6F6',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: -5
        // marginVertical: 12,
    },
    settingLabel: {
        color: 'white',
        fontSize: 16,
    },
    helpButton: {
        backgroundColor: '#1A2230',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 6,
    },
    helpButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ProfileSettingsScreen;