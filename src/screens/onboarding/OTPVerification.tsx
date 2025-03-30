import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const OTPVerification: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [otp, setOtp] = React.useState('');

  const handleVerify = () => {
    // Verify OTP logic
    navigation.navigate('NameEntry');
  };

  return (
    <View>
      <Text>Enter the OTP sent to your phone:</Text>
      <TextInput
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
};

export default OTPVerification; 