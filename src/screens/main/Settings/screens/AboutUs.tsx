import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SocialButton = ({ icon, title, url }: { icon: string; title: string; url: string }) => (
  <TouchableOpacity 
    style={styles.socialButton}
    onPress={() => Linking.openURL(url)}
  >
    <MaterialCommunityIcons name={icon as any} size={24} color="#fff" />
    <Text style={styles.socialButtonText}>{title}</Text>
  </TouchableOpacity>
);

export function AboutUs() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Story</Text>
          <Text style={styles.text}>
            Founded in 2025, we're committed to revolutionizing the way people shop online.
            Our platform combines cutting-edge technology with a user-friendly interface to
            provide the best shopping experience possible.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.text}>
            To create a seamless and enjoyable shopping experience that connects people
            with the products they love, while maintaining the highest standards of
            quality and customer service.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connect With Us</Text>
          <View style={styles.socialButtons}>
            <SocialButton
              icon="twitter"
              title="Twitter"
              url="https://twitter.com/example"
            />
            <SocialButton
              icon="instagram"
              title="Instagram"
              url="https://instagram.com/example"
            />
            <SocialButton
              icon="facebook"
              title="Facebook"
              url="https://facebook.com/example"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <Text style={styles.text}>
            Have questions or feedback? We'd love to hear from you!
          </Text>
          <Text style={styles.contactInfo}>Email: support@example.com</Text>
          <Text style={styles.contactInfo}>Phone: +1 (555) 123-4567</Text>
          <Text style={styles.contactInfo}>Address: 123 Tech Street, Silicon Valley, CA</Text>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.version}>Version 1.0.0</Text>
          <Text style={styles.copyright}> 2025 Your Company. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
    marginBottom: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  socialButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  socialButtonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 14,
  },
  contactInfo: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 8,
  },
  appInfo: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 14,
    color: '#666',
  },
});
