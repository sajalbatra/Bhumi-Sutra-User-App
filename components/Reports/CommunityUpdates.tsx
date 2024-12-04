import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
import HeaderSection from '../Home/Header';
const CommunityUpdatesScreen = () => {
  const priorityCases = [
    { id: '001', title: 'Case #001', status: 'Submitted' },
    { id: '002', title: 'Case #002', status: 'Action Taken' },
  ];

  const recentActions = [
    { id: '003', description: 'Verified Case #001: Action Taken' },
    { id: '004', description: 'Resolved Case #002' },
  ];

  const discussionThreads = [
    { id: '005', title: 'Discussion on Case #001', description: 'Citizen comments and observations' },
  ];

  const renderPriorityCase = ({ item }:any) => (
    <View style={styles.caseRow}>
      <View>
        <Text style={styles.caseTitle}>{item.title}</Text>
        <Text style={styles.caseStatus}>{item.status}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons name="thumbs-up-outline" size={20} color="#fff" />
        <Ionicons name="thumbs-down-outline" size={20} color="#fff" style={{ marginLeft: 15 }} />
      </View>
    </View>
  );

  const renderList = ({ item, type }:any) => (
    <View style={styles.listRow}>
      <Text style={styles.listTitle}>{item.title || item.description}</Text>
      {type === 'discussion' && <Text style={styles.listDescription}>{item.description}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderSection/>

      {/* Main Content */}
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>Community Updates</Text>
            <Text style={styles.subHeading}>
              Stay informed about flagged sites and progress in your area
            </Text>
            <Text style={styles.sectionTitle}>Priority Cases</Text>
          </View>
        }
        data={priorityCases}
        renderItem={renderPriorityCase}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
          <View>
            <Text style={styles.sectionTitle}>Recent Actions</Text>
            {recentActions.map((item) => renderList({ item }))}
            <Text style={styles.sectionTitle}>Discussion Threads</Text>
            {discussionThreads.map((item) => renderList({ item, type: 'discussion' }))}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030712',
    width:width,
    height:height
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
    textAlign:"center"
  },
  headerSubText: {
    color: '#D7C6F6',
    fontSize: 12,
    marginLeft: 5,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  subHeading: {
    fontSize: 14,
    color: '#A78BFA',
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 15,
    textAlign:"center"
  },
  caseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  caseTitle: {
    fontSize: 16,
    color: '#fff',
  },
  caseStatus: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 5,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  listRow: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  listTitle: {
    fontSize: 16,
    color: '#fff',
  },
  listDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 5,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default CommunityUpdatesScreen;
