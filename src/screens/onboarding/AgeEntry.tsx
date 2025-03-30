import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setAge } from '../../redux/userSlice';

const AgeEntry: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [age, setAgeState] = React.useState('');

  const handleNext = () => {
    const ageNumber = parseInt(age, 10);
    if (!isNaN(ageNumber)) {
      dispatch(setAge(ageNumber));
      navigation.navigate('GenderSelection');
    } else {
      // Handle invalid age input
    }
  };

  return (
    <View>
      <Text>Enter your age:</Text>
      <TextInput
        value={age}
        onChangeText={setAgeState}
        keyboardType="number-pad"
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default AgeEntry; 