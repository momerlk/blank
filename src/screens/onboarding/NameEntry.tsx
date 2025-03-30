import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setName } from '../../redux/userSlice';

const NameEntry: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setNameState] = React.useState('');

  const handleNext = () => {
    dispatch(setName(name));
    navigation.navigate('AgeEntry');
  };

  return (
    <View>
      <Text>Enter your name:</Text>
      <TextInput
        value={name}
        onChangeText={setNameState}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default NameEntry; 