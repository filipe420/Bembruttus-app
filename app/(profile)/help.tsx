import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, MessageCircle, Phone, Mail, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function HelpScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: '1',
      title: 'Account & Payment',
      questions: [
        'How do I reset my password?',
        'How do I update my payment method?',
        'Where can I find my order history?',
      ],
    },
    {
      id: '2',
      title: 'Orders & Delivery',
      questions: [
        'How do I track my order?',
        'Can I modify my order after placing it?',
        'What is the delivery fee?',
      ],
    },
    {
      id: '3',
      title: 'Menu & Nutrition',
      questions: [
        'Where can I find nutritional information?',
        'Do you have vegetarian options?',
        'Are there any allergen-free items?',
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#777" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search help articles"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption}>
              <MessageCircle size={24} color="#FF0000" />
              <Text style={styles.contactText}>Live Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactOption}>
              <Phone size={24} color="#FF0000" />
              <Text style={styles.contactText}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactOption}>
              <Mail size={24} color="#FF0000" />
              <Text style={styles.contactText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqCategories.map((category) => (
            <View key={category.id} style={styles.faqCategory}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              {category.questions.map((question, index) => (
                <TouchableOpacity key={index} style={styles.questionItem}>
                  <Text style={styles.questionText}>{question}</Text>
                  <ChevronRight size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.supportSection}>
          <Text style={styles.sectionTitle}>Additional Support</Text>
          
          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Submit a Request</Text>
              <Text style={styles.supportDescription}>
                Create a new support ticket
              </Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Knowledge Base</Text>
              <Text style={styles.supportDescription}>
                Browse our help articles
              </Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportItem}>
            <View style={styles.supportInfo}>
              <Text style={styles.supportTitle}>Community Forum</Text>
              <Text style={styles.supportDescription}>
                Connect with other users
              </Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>Was this helpful?</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feedbackButton}>
              <Text style={styles.feedbackButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactOption: {
    alignItems: 'center',
    flex: 1,
  },
  contactText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  faqSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  faqCategory: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  questionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  questionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  supportSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  supportItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  supportDescription: {
    fontSize: 14,
    color: '#666',
  },
  feedbackSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  feedbackButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  feedbackButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});