import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function MyOrders() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>My Orders</Text>
    </View>
  );
}
