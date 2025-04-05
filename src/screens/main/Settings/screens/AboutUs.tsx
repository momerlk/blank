import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function AboutUs() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>About Us</Text>

    </View>
  );
}
