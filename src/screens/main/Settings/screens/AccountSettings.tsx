import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../../../redux/userSlice';
import type { RootState } from '../../../../redux/store';

const SettingItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingContent}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#fff" />
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <Feather name="chevron-right" size={24} color="#666" />
  </TouchableOpacity>
);

export function AccountSettings() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state);

  const handleSignOut = () => {
    // Reset user state
    dispatch(resetUser());
    // Navigate to Welcome screen
    navigation.navigate('Welcome' as never);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.profilePictureContainer}>
            <Image 
              source={{ uri: user.profilePicture || 'https://via.placeholder.com/150' }}
              style={styles.profilePicture}
            />
            <TouchableOpacity 
              style={styles.editPictureButton}
              onPress={() => navigation.navigate('EditProfile' as never)}
            >
              <MaterialCommunityIcons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.email}>{user.email || 'No email set'}</Text>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsSection}>
          <SettingItem
            icon="account-edit"
            title="Edit Profile"
            onPress={() => navigation.navigate('EditProfile' as never)}
          />

          <SettingItem
            icon="lock"
            title="Change Password"
            onPress={() => navigation.navigate('ChangePassword' as never)}
          />

          <SettingItem
            icon="bell"
            title="Notifications"
            onPress={() => navigation.navigate('NotificationSettings' as never)}
          />
        </View>

        <TouchableOpacity 
          style={[styles.settingItem, styles.deleteButton]}
          onPress={handleSignOut}
        >
          <View style={styles.settingContent}>
            <MaterialCommunityIcons name="logout" size={24} color="#ff4444" />
            <Text style={[styles.settingText, { color: '#ff4444' }]}>Sign Out</Text>
          </View>
        </TouchableOpacity>
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
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePictureContainer: {
    position: 'relative',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPictureButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#666',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  settingsSection: {
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#111',
    marginBottom: 1,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 15,
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: '#1a1a1a',
  },
});
