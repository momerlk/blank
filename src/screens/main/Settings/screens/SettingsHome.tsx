import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { resetUser } from '../../../../redux/slices/userSlice';
import { StatusBar } from 'expo-status-bar';

const SettingItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <View style={styles.settingContent}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#fff" />
      <Text style={styles.settingText}>{title}</Text>
    </View>
    <Feather name="chevron-right" size={24} color="#666" />
  </TouchableOpacity>
);

export function SettingsHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <SettingItem
          icon="account-cog"
          title="Account Settings"
          onPress={() => navigation.navigate('AccountSettings' as never)}
        />
        
        <SettingItem
          icon="shopping"
          title="My Orders"
          onPress={() => navigation.navigate('MyOrders' as never)}
        />

        <View style={styles.separator} />

        <SettingItem
          icon="information"
          title="About Us"
          onPress={() => navigation.navigate('AboutUs' as never)}
        />

        <SettingItem
          icon="shield-lock"
          title="Privacy Policy"
          onPress={() => navigation.navigate('PrivacyPolicy' as never)}
        />

        <TouchableOpacity 
          style={[styles.settingItem, styles.logoutButton]}
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
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 20,
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
  separator: {
    height: 20,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#1a1a1a',
  },
});
