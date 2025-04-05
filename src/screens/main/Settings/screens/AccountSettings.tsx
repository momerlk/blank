import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function AccountSettings() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Account Settings</Text>
    </View>
  );
}
