import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';

export function SettingsHome() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Settings</Text>
      <Button 
        title="Account Settings" 
        onPress={() => navigation.navigate('AccountSettings')} 
      />
      <Button 
        title="My Orders" 
        onPress={() => navigation.navigate('MyOrders')} 
      />
      <Button 
        title="About Us" 
        onPress={() => navigation.navigate('AboutUs')} 
      />
      <Button 
        title="Privacy Policy" 
        onPress={() => navigation.navigate('PrivacyPolicy')} 
      />

        <Button title="Sign out" />
    </View>
  );
}

