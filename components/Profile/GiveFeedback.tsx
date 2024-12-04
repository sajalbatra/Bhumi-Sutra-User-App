import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import HeaderSection from '../Home/Header';

const { width, height } = Dimensions.get('window');

// Star Rating Component
const StarRating = ({ rating, setRating }:any) => {
  const totalStars = 5;

  return (
    <View style={styles.starContainer}>
      {[...Array(totalStars)].map((_, index) => {
        const starNumber = index + 1;
        return (
          <TouchableOpacity 
            key={index} 
            onPress={() => setRating(starNumber)}
          >
            <AntDesign name="star" size={24}            
              color={starNumber <= rating ? '#7c3aed' : '#4B5563'}
              fill={starNumber <= rating ? '#7c3aed' : 'transparent'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const FeedbackRatingsScreen = () => {
  const [userFeedback, setUserFeedback] = useState('');
  const [featureEnhancements, setFeatureEnhancements] = useState('');
  const [rating, setRating] = useState(0);
  const [numReviews, setNumReviews] = useState(22);

  const handleSubmitFeedback = () => {
    // Handle submitting user feedback and feature enhancement suggestions
    console.log('User Rating:', rating);
    console.log('User Feedback:', userFeedback);
    console.log('Feature Enhancements:', featureEnhancements);
    
    // Reset inputs after submission
    setUserFeedback('');
    setFeatureEnhancements('');
    setRating(0);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <HeaderSection />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Feedback & Ratings</Text>
          <Text style={styles.subtitle}>We Value Your Feedback</Text>
          
          <Text style={styles.prompt}>Rate Your Experience</Text>
          <StarRating rating={rating} setRating={setRating} />
          
          {rating > 0 && (
            <Text style={styles.ratingText}>
              You rated {rating} out of 5 stars
            </Text>
          )}
          
          <Text style={styles.prompt}>Share your experience with our app</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={4}
            placeholder="Share your detailed feedback here..."
            placeholderTextColor="#6B7280"
            value={userFeedback}
            onChangeText={setUserFeedback}
          />
          
          <Text style={styles.prompt}>Suggest new features or enhancements</Text>
          <TextInput
            style={styles.feedbackInput}
            multiline
            numberOfLines={4}
            placeholder="What features would you like to see?"
            placeholderTextColor="#6B7280"
            value={featureEnhancements}
            onChangeText={setFeatureEnhancements}
          />
          
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (rating === 0 || userFeedback.trim() === '') && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmitFeedback}
            disabled={rating === 0 || userFeedback.trim() === ''}
          >
            <Text style={styles.submitButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
          
          <Text style={styles.thankYou}>
            Thank you for helping us improve!
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030712',
    width:width,
    height:height
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    color: '#D7C6F6',
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
  },
  prompt: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  feedbackInput: {
    backgroundColor: '#1A2230',
    color: 'white',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 24,
    width: '100%',
    marginVertical: 16,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#4B5563',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thankYou: {
    color: '#D7C6F6',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default FeedbackRatingsScreen;