import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import HeaderSection from './Header';
const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComment("");
    }
  };
  const data = [
    "You have 2 Pending Reports.",
    "1 Report Resolved This Week."
  ]
  const renderSummaryItem = ({ item }: any) => {

    return (
      <View>
        {/* {

          data.map((datatext, index) => (
            <Text style={styles.summaryItemText}>{datatext}</Text>
          ))
        } */}
        <Text style={styles.summaryItemText}>{item}</Text>
      </View>
    );
  };

  const renderLiveFeedItem = () => {
    // Placeholder for live feed items
    return (
      <View style={styles.liveFeedItemContainer}>
        <Text style={styles.liveFeedItemText}>
          Inspection completed for Site #123
        </Text>
        <Text style={styles.liveFeedItemSubtext}>
          Comment: New construction in XYZ area. Needs verification!
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#030712" />
      {/* Header */}
      <View style={styles.homeviewcontainer}>
        {/* <View style={styles.headerTopRow}>
          <View style={styles.locationContainer}>
            <Entypo name="location-pin" size={30} color="white" />
            <View>
              <Text style={styles.headerTitle}>Home</Text>
              <Text style={styles.headerSubtitle}>123 ABC Down.....</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <Feather name="bell" size={24} color="white" style={styles.iconMargin} />
            <Feather name="menu" size={24} color="white" />
          </View>
        </View> */}
        <HeaderSection/>
        {/* Navigation Buttons */}
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

        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <Text style={styles.welcomeText}>Welcome Back, Sajal!</Text>
          <View style={styles.progressWrapper}>
            <MaterialCommunityIcons name="progress-star" size={24} color="#7836E9" />
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.progressText}>5/10 reports this month!</Text>
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.middleSection}>
          {/* Summary */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <FlatList
              data={data}
              renderItem={renderSummaryItem}
              keyExtractor={(item) => item.toString()}
            />
          </View>

          {/* Tip of the Day/News */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Tip of the Day/News:</Text>
            <Text style={styles.tipText}>
              Tip: How to spot illegal structures in your neighborhood
            </Text>
          </View>

          {/* Live Feed */}
          <View style={styles.liveFeedContainer}>
            <Text style={styles.sectionTitle}>Live Feed</Text>
            <FlatList
              data={[1]}
              renderItem={renderLiveFeedItem}
              keyExtractor={(item) => item.toString()}
            />

            {/* Comment Input */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder='Add a Comment'
                placeholderTextColor="#888"
                value={comment}
                onChangeText={setComment}
                keyboardType="default"
                multiline
              />
              <TouchableOpacity
                style={styles.commentSubmitButton}
                onPress={handleCommentSubmit}
              >
                <Text style={styles.commentSubmitText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: '#030712',
  },
  homeviewcontainer: {
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
  progressContainer: {
    marginBottom: 20,
    justifyContent: "center"
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 600,
    lineHeight: 22

  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    width: 140,
    height: 10,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginRight: 8,
    marginLeft: 3
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#7836E9',
    borderRadius: 5,
  },
  progressText: {
    color: 'white',
  },
  middleSection: {
    paddingHorizontal: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tipText: {
    color: '#888',
  },
  summaryItemContainer: {
    backgroundColor: '#1A2230',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  summaryItemText: {
    color: 'white',
  },
  liveFeedContainer: {
    backgroundColor: '#24194E',
    borderRadius: 25,
    padding: 15,
  },
  liveFeedItemContainer: {
    backgroundColor: '#1A2230',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  liveFeedItemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  liveFeedItemSubtext: {
    color: '#888',
  },
  commentInputContainer: {
    backgroundColor: '#1A2230',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    color: 'white',
    minHeight: 40,
    maxHeight: 100,
  },
  commentSubmitButton: {
    backgroundColor: '#7836E9',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal:20,
    marginLeft: 10,
  },
  commentSubmitText: {
    color: 'white',
  },
});

export default HomeScreen