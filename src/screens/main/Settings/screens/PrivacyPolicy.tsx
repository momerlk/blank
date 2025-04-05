import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function PrivacyPolicy() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Privacy Policy</Text>
    </View>
  );
}
