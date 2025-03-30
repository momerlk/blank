import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setInterests } from '../../redux/userSlice';

const InterestsSelection: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);

  const handleSelectInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    dispatch(setInterests(selectedInterests));
    navigation.navigate('LocationRequest');
  };

  return (
    <View>
      <Text>Select your interests:</Text>
      <Button title="Fashion" onPress={() => handleSelectInterest('Fashion')} />
      <Button title="Technology" onPress={() => handleSelectInterest('Technology')} />
      <Button title="Sports" onPress={() => handleSelectInterest('Sports')} />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default InterestsSelection; 