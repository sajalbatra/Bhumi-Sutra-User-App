import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import HeaderSection from '../Home/Header';
const HelpScreen = () => {
  return (
    <View style={styles.container}>        
    <HeaderSection/>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Help & Tutorials</Text>

        {/* Step-by-Step Guides */}
        <Text style={styles.subHeading}>Step-by-Step Guides</Text>
        <View style={styles.section}>
          <Text style={styles.title}>How to Submit a Report</Text>
          <Text style={styles.description}>Learn to report suspicious activities</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>View Report Status</Text>
          <Text style={styles.description}>Track your submitted reports</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Engage with Community Updates</Text>
          <Text style={styles.description}>Stay informed and involved</Text>
        </View>

        {/* FAQs */}
        <Text style={styles.subHeading}>FAQs</Text>
        <View style={styles.section}>
          <Text style={styles.title}>What happens to my report?</Text>
          <Text style={styles.description}>How is my privacy protected?</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>How can I update my report?</Text>
          <Text style={styles.description}>Can I see community feedback?</Text>
        </View>

        {/* Video Tutorials */}
        <Text style={styles.subHeading}>Video Tutorials</Text>
        <View style={styles.section}>
          <Text style={styles.title}>Submitting a Report</Text>
          <Text style={styles.description}>Viewing Status Updates</Text>
        </View>

        {/* Contact Support Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030712',
    width:width,
    height:height
  },
  scrollContainer: {
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D7C6F6',
    textAlign: 'center',
    // marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'center',
  },
  section: {
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF', // Light gray for descriptions
    marginTop: 5,
  },
  button: {
    backgroundColor: '#8B5CF6', // Purple button
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HelpScreen;
