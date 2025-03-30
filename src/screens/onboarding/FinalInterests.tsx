import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setInterests, completeOnboarding } from '../../redux/userSlice';

const FinalInterests: React.FC = () => {
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

  const handleFinish = () => {
    dispatch(setInterests(selectedInterests));
    dispatch(completeOnboarding());
    navigation.navigate('Home'); // Navigate to home screen
  };

  return (
    <View>
      <Text>Reselect your key interests:</Text>
      <Button title="Fashion" onPress={() => handleSelectInterest('Fashion')} />
      <Button title="Technology" onPress={() => handleSelectInterest('Technology')} />
      <Button title="Sports" onPress={() => handleSelectInterest('Sports')} />
      <Button title="Finish" onPress={handleFinish} />
    </View>
  );
};

export default FinalInterests; 