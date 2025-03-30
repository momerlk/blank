import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhoneNumberScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('OTP');
  };

  return (
    <View>
      <Text>Can we get your number ?</Text>
      <Button title="Next ->" onPress={handleNext} />
    </View>
  );
};

export default PhoneNumberScreen; 