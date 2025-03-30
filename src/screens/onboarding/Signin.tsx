import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setGender } from '../../redux/userSlice';

const Signin: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSelectGender = (gender: string) => {
    dispatch(setGender(gender));
    navigation.navigate('InterestsSelection');
  };

  return (
    <View>
      <Text>Sign in</Text>
      <Button title="Male" onPress={() => handleSelectGender('Male')} />
      <Button title="Female" onPress={() => handleSelectGender('Female')} />
      <Button title="Other" onPress={() => handleSelectGender('Other')} />
    </View>
  );
};

export default Signin; 