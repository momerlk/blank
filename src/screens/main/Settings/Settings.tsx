import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsHome } from './screens/SettingsHome';
import { AccountSettings } from './screens/AccountSettings';
import { MyOrders } from './screens/MyOrders';
import { AboutUs } from './screens/AboutUs';
import { PrivacyPolicy } from './screens/PrivacyPolicy';
import { EditProfile } from './screens/account/EditProfile';
import { ChangePassword } from './screens/account/ChangePassword';
import { NotificationSettings } from './screens/account/NotificationSettings';

const Stack = createNativeStackNavigator();

export function SettingsStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="SettingsHome" component={SettingsHome} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
      <Stack.Screen name="MyOrders" component={MyOrders} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
}
