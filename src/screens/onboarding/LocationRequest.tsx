import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setLocation } from '../../redux/userSlice';

const LocationRequest: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRequestLocation = () => {
    // Request location permission and get location
    const location = 'Sample Location'; // Replace with actual location logic
    dispatch(setLocation(location));
    navigation.navigate('PasswordSetup');
  };

  return (
    <View>
      <Text>We need your location to personalize your experience.</Text>
      <Button title="Allow Location Access" onPress={handleRequestLocation} />
    </View>
  );
};

export default LocationRequest; 