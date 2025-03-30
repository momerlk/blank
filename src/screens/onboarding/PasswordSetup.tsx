import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setPassword } from '../../redux/userSlice';

const PasswordSetup: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [password, setPasswordState] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleNext = () => {
    if (password === confirmPassword) {
      dispatch(setPassword(password));
      navigation.navigate('FinalInterests');
    } else {
      // Handle password mismatch
    }
  };

  return (
    <View>
      <Text>Set your password:</Text>
      <TextInput
        value={password}
        onChangeText={setPasswordState}
        secureTextEntry
      />
      <Text>Confirm your password:</Text>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
};

export default PasswordSetup; 